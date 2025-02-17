const TemplateService = require ("../services/templateService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = TemplateController = {
  async createTemplate(req, res) {
    try {
      const template = await TemplateService.createTemplate(req.body, req.user.id)
      res.status(201).json(template)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getTemplate(req, res) {
    try {
      const template = await TemplateService.getTemplate(req.params.id)
      res.status(200).json(template)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateTemplate(req, res) {
    try {
      const template = await TemplateService.updateTemplate(req.params.id, req.body)
      res.status(200).json(template)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteTemplate(req, res) {
    try {
      await TemplateService.deleteTemplate(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listTemplates(req, res) {
    try {
      const templates = await TemplateService.listTemplates(req.user.id, req.query)
      res.status(200).json(templates)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

