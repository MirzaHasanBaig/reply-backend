const bcrypt  = require("bcrypt")
const jwt  = require("jsonwebtoken")
const { User }  = require("../models/User")
const { sendOTP }  = require("../utils/otp")
const { generateAuthenticatorSecret, verifyToken }  = require("../utils/authenticator")
const { OAuth2Client }  = require("google-auth-library")
const { ConfidentialClientApplication } = require('@azure/msal-node');
const e = require("express")
const { Regex } = require("lucide-react")


const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
// const config = {
//   auth: {
//     clientId: process.env.MICROSOFT_CLIENT_ID,
//     authority: process.env.MICROSOFT_AUTHORITY,
//     clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
//   },
// }

// var msAuthProvider = new ConfidentialClientApplication(config);

const login = async (email, password, otpSecret) => {
  try{const user = await User.findOne({ email },{
    googleId: 0,
    microsoftId: 0,
    authenticatorSecret: 0});
  if (!user.otpSecret || user.otpSecret !== otpSecret || !(await bcrypt.compare(password, user.password))) {
    return  {status: false, code: 401, message: "Invalid Credentials"};
  }

  user.otpSecret = undefined;
  user.save();
  
  if(user.emailverified != true){
    return  {status: false, code: 401, message: "Email Not Verified"};
  }
  return  {status: true, code: 200, message: "Login", token: generateToken(user)};
}catch{
  return  {status: true, code: 400, message: "Format Error"}
}
}

const register = async (userData) => {
  try{
  const user = new User(userData);
  await user.save();
  return  {status: true, code: 200, message: "User Registered Successfully"};
}
  catch (e){
    return {status: false, code: 401, message: "Email Already Exists"};
  }
}

const signInWithGoogle = async (token) => {
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

// const signInWithMicrosoft = async (code) => {
//   const tokenResponse = await msAuthProvider.acquireTokenByCode({ code })
//   const { email, name, sub } = tokenResponse.idTokenClaims

//   let user = await User.findOne({ email })
//   if (!user) {
//     user = new User({
//       email,
//       name,
//       microsoftId: sub,
//     })
//     await user.save()
//   }
//   return generateToken(user)
// }

const sendOTPToUser = async (email,password) => {
  try{
  const user = await User.findOne({email});
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return  {status: true, code: 200, message: "OTP send to Email"};
  }

  const otp = await sendOTP(user.email)
  user.otpSecret = otp.secret
  await user.save()
  return  {status: true, code: 200, message: "OTP send to Email"};}catch{
    return  {status: true, code: 400, message: "Format Error"}
  }
}

const verifyOTP = async (userId, otp) => {
  const user = await User.findById(userId)
  if (!user || !user.otpSecret) throw new Error("Invalid OTP request")
  const isValid = verifyToken(user.otpSecret, otp)
  if (isValid) {
    user.otpSecret = undefined
    await user.save()
  }
  return isValid
}

const setupAuthenticator = async (userId) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User not found")
  const secret = generateAuthenticatorSecret()
  user.authenticatorSecret = secret
  await user.save()
  return secret
}

const verifyAuthenticator = async (userId, token) => {
  const user = await User.findById(userId)
  if (!user || !user.authenticatorSecret) throw new Error("Invalid authenticator setup")
  return verifyToken(user.authenticatorSecret, token)
}

const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User not found")
  if (!(await bcrypt.compare(oldPassword, user.password))) {
    throw new Error("Invalid old password")
  }
  user.password = await bcrypt.hash(newPassword, 10)
  await user.save()
}

const generateToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET , { expiresIn: "1d" })
}

module.exports = {login,register,changePassword,setupAuthenticator,verifyAuthenticator,verifyOTP,sendOTPToUser,signInWithGoogle}