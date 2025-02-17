const MessagingService = require ("../services/messagingService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = MessagingController = {
  async sendSMS(req, res) {
    try {
      const result = await MessagingService.sendSMS(req.body)
      res.status(200).json(result)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async sendMMS(req, res) {
    try {
      const result = await MessagingService.sendMMS(req.body)
      res.status(200).json(result)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async sendRCS(req, res) {
    try {
      const result = await MessagingService.sendRCS(req.body)
      res.status(200).json(result)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getMessageStatus(req, res) {
    try {
      const status = await MessagingService.getMessageStatus(req.params.messageId)
      res.status(200).json(status)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

