const AIAssistantService = require ("../services/aiAssistantService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = AIAssistantController = {
  async createAssistant(req, res) {
    try {
      const assistant = await AIAssistantService.createAssistant(req.body, req.user.id)
      res.status(201).json(assistant)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getAssistant(req, res) {
    try {
      const assistant = await AIAssistantService.getAssistant(req.params.id, req.user.id)
      res.status(200).json(assistant)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateAssistant(req, res) {
    try {
      const assistant = await AIAssistantService.updateAssistant(req.params.id, req.body, req.user.id)
      res.status(200).json(assistant)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteAssistant(req, res) {
    try {
      await AIAssistantService.deleteAssistant(req.params.id, req.user.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listAssistants(req, res) {
    try {
      const assistants = await AIAssistantService.listAssistants(req.user.id, req.query)
      res.status(200).json(assistants)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getAssistantResponse(req, res) {
    try {
      const response = await AIAssistantService.getAssistantResponse(req.params.id, req.user.id, req.body.message)
      res.status(200).json({ response })
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

