const APIManagementService = require ("../services/apiManagementService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = APIManagementController = {
  async createAPIKey(req, res) {
    try {
      const apiKey = await APIManagementService.createAPIKey(req.body, req.user.id)
      res.status(201).json(apiKey)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getAPIKey(req, res) {
    try {
      const apiKey = await APIManagementService.getAPIKey(req.params.id, req.user.id)
      res.status(200).json(apiKey)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateAPIKey(req, res) {
    try {
      const apiKey = await APIManagementService.updateAPIKey(req.params.id, req.body, req.user.id)
      res.status(200).json(apiKey)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteAPIKey(req, res) {
    try {
      await APIManagementService.deleteAPIKey(req.params.id, req.user.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listAPIKeys(req, res) {
    try {
      const apiKeys = await APIManagementService.listAPIKeys(req.user.id, req.query)
      res.status(200).json(apiKeys)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

