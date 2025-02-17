const IntegrationService = require ("../services/integrationService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = IntegrationController = {
  async createIntegration(req, res) {
    try {
      const integration = await IntegrationService.createIntegration(req.body, req.user.id)
      res.status(201).json(integration)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getIntegration(req, res) {
    try {
      const integration = await IntegrationService.getIntegration(req.params.id)
      res.status(200).json(integration)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateIntegration(req, res) {
    try {
      const integration = await IntegrationService.updateIntegration(req.params.id, req.body)
      res.status(200).json(integration)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteIntegration(req, res) {
    try {
      await IntegrationService.deleteIntegration(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listIntegrations(req, res) {
    try {
      const integrations = await IntegrationService.listIntegrations(req.user.id, req.query)
      res.status(200).json(integrations)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

