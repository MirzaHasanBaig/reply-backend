const UserService = require ("../services/userService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = UserController = {
  async register(req, res) {
    try {
      const user = await UserService.register(req.body)
      res.status(201).json(user)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async login(req, res) {
    try {
      const { token, refreshToken, user } = await UserService.login(req.body)
      res.status(200).json({ token, refreshToken, user })
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async googleAuth(req, res) {
    try {
      const { token, refreshToken, user } = await UserService.googleAuth(req.body)
      res.status(200).json({ token, refreshToken, user })
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async refreshToken(req, res) {
    try {
      const { token, refreshToken } = await UserService.refreshToken(req.body.refreshToken)
      res.status(200).json({ token, refreshToken })
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getProfile(req, res) {
    try {
      const user = await UserService.getProfile(req.user.id)
      res.status(200).json(user)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateProfile(req, res) {
    try {
      const user = await UserService.updateProfile(req.user.id, req.body)
      res.status(200).json(user)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteAccount(req, res) {
    try {
      await UserService.deleteAccount(req.user.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async enable2FA(req, res) {
    try {
      const result = await UserService.enable2FA(req.user.id)
      res.status(200).json(result)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async verify2FA(req, res) {
    try {
      const result = await UserService.verify2FA(req.user.id, req.body.token)
      res.status(200).json(result)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

