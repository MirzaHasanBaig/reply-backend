const bcrypt  = require("bcrypt")
const jwt  = require("jsonwebtoken")
const { User }  = require("../models/User")
const { sendOTP }  = require("../utils/otp")
const { generateAuthenticatorSecret, verifyToken }  = require("../utils/authenticator")
const { OAuth2Client }  = require("google-auth-library")
const { MicrosoftAuthProvider }  = require("@azure/msal-node")

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const msalConfig = {
  auth: {
    clientId: process.env.MICROSOFT_CLIENT_ID,
    authority: process.env.MICROSOFT_AUTHORITY,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  },
}
const msAuthProvider = new MicrosoftAuthProvider(msalConfig)

export const login = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials")
  }
  return generateToken(user)
}

export const register = async (userData: any) => {
  const user = new User(userData)
  await user.save()
  return generateToken(user)
}

export const signInWithGoogle = async (token) => {
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  })
  const payload = ticket.getPayload()
  if (!payload) throw new Error("Invalid Google token")

  let user = await User.findOne({ email: payload.email })
  if (!user) {
    user = new User({
      email: payload.email,
      name: payload.name,
      googleId: payload.sub,
    })
    await user.save()
  }
  return generateToken(user)
}

export const signInWithMicrosoft = async (code) => {
  const tokenResponse = await msAuthProvider.acquireTokenByCode({ code })
  const { email, name, sub } = tokenResponse.idTokenClaims

  let user = await User.findOne({ email })
  if (!user) {
    user = new User({
      email,
      name,
      microsoftId: sub,
    })
    await user.save()
  }
  return generateToken(user)
}

export const sendOTPToUser = async (userId) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User not found")
  const otp = await sendOTP(user.email)
  user.otpSecret = otp.secret
  await user.save()
}

export const verifyOTP = async (userId, otp) => {
  const user = await User.findById(userId)
  if (!user || !user.otpSecret) throw new Error("Invalid OTP request")
  const isValid = verifyToken(user.otpSecret, otp)
  if (isValid) {
    user.otpSecret = undefined
    await user.save()
  }
  return isValid
}

export const setupAuthenticator = async (userId) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User not found")
  const secret = generateAuthenticatorSecret()
  user.authenticatorSecret = secret
  await user.save()
  return secret
}

export const verifyAuthenticator = async (userId, token) => {
  const user = await User.findById(userId)
  if (!user || !user.authenticatorSecret) throw new Error("Invalid authenticator setup")
  return verifyToken(user.authenticatorSecret, token)
}

export const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User not found")
  if (!(await bcrypt.compare(oldPassword, user.password))) {
    throw new Error("Invalid old password")
  }
  user.password = await bcrypt.hash(newPassword, 10)
  await user.save()
}

const generateToken = (user: any) => {
  return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET , { expiresIn: "1d" })
}

