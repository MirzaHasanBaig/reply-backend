const Integration = require ("../models/integration.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = IntegrationService = {
  async createIntegration(integrationData, userId) {
    const integration = new Integration({
      ...integrationData,
      user: userId,
    })
    await integration.save()
    return integration
  },

  async getIntegration(integrationId) {
    const integration = await Integration.findById(integrationId)
    if (!integration) {
      throw new NotFoundError("Integration not found")
    }
    return integration
  },

  async updateIntegration(integrationId, updateData) {
    const integration = await Integration.findByIdAndUpdate(integrationId, updateData, { new: true })
    if (!integration) {
      throw new NotFoundError("Integration not found")
    }
    return integration
  },

  async deleteIntegration(integrationId) {
    const result = await Integration.findByIdAndDelete(integrationId)
    if (!result) {
      throw new NotFoundError("Integration not found")
    }
  },

  async listIntegrations(userId, query) {
    const { page = 1, limit = 10, type, status } = query
    const filter = { user: userId }

    if (type) {
      filter.type = type
    }

    if (status) {
      filter.status = status
    }

    const integrations = await Integration.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await Integration.countDocuments(filter)

    return {
      integrations,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },
}

