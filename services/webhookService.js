const Webhook = require ("../models/webhook.js")
const { NotFoundError } = require ("../utils/errors.js")
const axios = require ("axios")

module.exports = WebhookService = {
  async createWebhook(webhookData, userId) {
    const webhook = new Webhook({
      ...webhookData,
      owner: userId,
    })
    await webhook.save()
    return webhook
  },

  async getWebhook(webhookId, userId) {
    const webhook = await Webhook.findOne({ _id: webhookId, owner: userId })
    if (!webhook) {
      throw new NotFoundError("Webhook not found")
    }
    return webhook
  },

  async updateWebhook(webhookId, updateData, userId) {
    const webhook = await Webhook.findOneAndUpdate({ _id: webhookId, owner: userId }, updateData, { new: true })
    if (!webhook) {
      throw new NotFoundError("Webhook not found")
    }
    return webhook
  },

  async deleteWebhook(webhookId, userId) {
    const result = await Webhook.findOneAndDelete({ _id: webhookId, owner: userId })
    if (!result) {
      throw new NotFoundError("Webhook not found")
    }
  },

  async listWebhooks(userId, query) {
    const { page = 1, limit = 10 } = query
    const webhooks = await Webhook.find({ owner: userId })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await Webhook.countDocuments({ owner: userId })

    return {
      webhooks,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },

  async triggerWebhook(event, data) {
    const webhooks = await Webhook.find({ events: event, active: true })

    const promises = webhooks.map((webhook) =>
      axios.post(webhook.url, {
        event,
        data,
        timestamp: new Date().toISOString(),
      }),
    )

    await Promise.allSettled(promises)
  },
}

