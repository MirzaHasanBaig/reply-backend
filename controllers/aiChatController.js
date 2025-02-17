const AIChatService = require ("../services/aiChatService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = AIChatController = {
  async createChat(req, res) {
    try {
      const chat = await AIChatService.createChat(req.body, req.user.id)
      res.status(201).json(chat)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getChat(req, res) {
    try {
      const chat = await AIChatService.getChat(req.params.id)
      res.status(200).json(chat)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async sendMessage(req, res) {
    try {
      const message = await AIChatService.sendMessage(req.params.id, req.body)
      res.status(200).json(message)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listChats(req, res) {
    try {
      const chats = await AIChatService.listChats(req.user.id, req.query)
      res.status(200).json(chats)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async endChat(req, res) {
    try {
      const chat = await AIChatService.endChat(req.params.id)
      res.status(200).json(chat)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

