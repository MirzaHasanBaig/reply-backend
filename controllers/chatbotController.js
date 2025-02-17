const ChatbotService = require ("../services/chatbotService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = ChatbotController = {
  async createChatbot(req, res) {
    try {
      const chatbot = await ChatbotService.createChatbot(req.body)
      res.status(201).json(chatbot)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getChatbot(req, res) {
    try {
      const chatbot = await ChatbotService.getChatbot(req.params.id)
      res.status(200).json(chatbot)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateChatbot(req, res) {
    try {
      const chatbot = await ChatbotService.updateChatbot(req.params.id, req.body)
      res.status(200).json(chatbot)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteChatbot(req, res) {
    try {
      await ChatbotService.deleteChatbot(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async sendMessage(req, res) {
    try {
      const response = await ChatbotService.sendMessage(req.params.id, req.body)
      res.status(200).json(response)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

