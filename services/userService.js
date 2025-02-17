const User = require ("../models/user.js")
const { NotFoundError, ValidationError, AuthenticationError } = require ("../utils/errors.js")
const { redisClient } = require ("../config/redis.js")
const { OAuth2Client } = require ("google-auth-library")
const speakeasy = require ("speakeasy")
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

module.exports = UserService = {
  async register(userData) {
    const existingUser = await User.findOne({ email: userData.email })
    if (existingUser) {
      throw new ValidationError("Email already in use")
    }

    const user = await User.create(userData)
    const token = user.createJWT()
    const refreshToken = user.createJWT()

    await redisClient.set(`refreshToken:${refreshToken}`, user._id.toString(), "EX", 7 * 24 * 60 * 60)

    return { token, refreshToken, user: user.toObject() }
  },

  async login({ email, password }) {
    const user = await User.findOne({ email }).select("+password")
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new AuthenticationError("Invalid email or password")
    }

    const token = user.createJWT()
    const refreshToken = user.createJWT()

    await redisClient.set(`refreshToken:${refreshToken}`, user._id.toString(), "EX", 7 * 24 * 60 * 60)

    return { token, refreshToken, user: user.toObject() }
  },

  async googleAuth({ token }) {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    const payload = ticket.getPayload()
    const { email, name, picture } = payload

    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({ email, name, profilePicture: picture })
    }

    const jwtToken = user.createJWT()
    const refreshToken = user.createJWT()

    await redisClient.set(`refreshToken:${refreshToken}`, user._id.toString(), "EX", 7 * 24 * 60 * 60)

    return { token: jwtToken, refreshToken, user: user.toObject() }
  },

  async refreshToken(refreshToken) {
    const userId = await redisClient.get(`refreshToken:${refreshToken}`)
    if (!userId) {
      throw new AuthenticationError("Invalid refresh token")
    }

    const user = await User.findById(userId)
    if (!user) {
      throw new NotFoundError("User not found")
    }

    const newToken = user.createJWT()
    const newRefreshToken = user.createJWT()

    await redisClient.del(`refreshToken:${refreshToken}`)
    await redisClient.set(`refreshToken:${newRefreshToken}`, user._id.toString(), "EX", 7 * 24 * 60 * 60)

    return { token: newToken, refreshToken: newRefreshToken }
  },

  async getProfile(userId) {
    const user = await User.findById(userId)
    if (!user) {
      throw new NotFoundError("User not found")
    }
    return user.toObject()
  },

  async updateProfile(userId, updateData) {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
    if (!user) {
      throw new NotFoundError("User not found")
    }
    return user.toObject()
  },

  async deleteAccount(userId) {
    const result = await User.findByIdAndDelete(userId)
    if (!result) {
      throw new NotFoundError("User not found")
    }
  },

  async enable2FA(userId) {
    const user = await User.findById(userId)
    if (!user) {
      throw new NotFoundError("User not found")
    }

    const secret = speakeasy.generateSecret({ length: 32 })
    user.twoFactorSecret = secret.base32
    await user.save()

    return {
      otpauthUrl: secret.otpauth_url,
      base32: secret.base32,
    }
  },

  async verify2FA(userId, token) {
    const user = await User.findById(userId)
    if (!user) {
      throw new NotFoundError("User not found")
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token: token,
    })

    if (verified) {
      user.twoFactorEnabled = true
      await user.save()
      return { verified: true }
    } else {
      throw new AuthenticationError("Invalid 2FA token")
    }
  },
}

