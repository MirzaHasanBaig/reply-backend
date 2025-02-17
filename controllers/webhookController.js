const WebhookService = require ("../services/webhookService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = WebhookController = {
  async createWebhook(req, res) {
    try {
      const webhook = await WebhookService.createWebhook(req.body, req.user.id)
      res.status(201).json(webhook)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getWebhook(req, res) {
    try {
      const webhook = await WebhookService.getWebhook(req.params.id, req.user.id)
      res.status(200).json(webhook)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateWebhook(req, res) {
    try {
      const webhook = await WebhookService.updateWebhook(req.params.id, req.body, req.user.id)
      res.status(200).json(webhook)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteWebhook(req, res) {
    try {
      await WebhookService.deleteWebhook(req.params.id, req.user.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listWebhooks(req, res) {
    try {
      const webhooks = await WebhookService.listWebhooks(req.user.id, req.query)
      res.status(200).json(webhooks)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

