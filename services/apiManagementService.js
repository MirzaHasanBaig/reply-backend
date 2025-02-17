const APIKey = require ("../models/apiKey.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = APIManagementService = {
  async createAPIKey(apiKeyData, userId) {
    const apiKey = new APIKey({
      ...apiKeyData,
      owner: userId,
    })
    await apiKey.save()
    return apiKey
  },

  async getAPIKey(apiKeyId, userId) {
    const apiKey = await APIKey.findOne({ _id: apiKeyId, owner: userId })
    if (!apiKey) {
      throw new NotFoundError("API Key not found")
    }
    return apiKey
  },

  async updateAPIKey(apiKeyId, updateData, userId) {
    const apiKey = await APIKey.findOneAndUpdate({ _id: apiKeyId, owner: userId }, updateData, { new: true })
    if (!apiKey) {
      throw new NotFoundError("API Key not found")
    }
    return apiKey
  },

  async deleteAPIKey(apiKeyId, userId) {
    const result = await APIKey.findOneAndDelete({ _id: apiKeyId, owner: userId })
    if (!result) {
      throw new NotFoundError("API Key not found")
    }
  },

  async listAPIKeys(userId, query) {
    const { page = 1, limit = 10 } = query
    const apiKeys = await APIKey.find({ owner: userId })
      .select("-key")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await APIKey.countDocuments({ owner: userId })

    return {
      apiKeys,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },

  async validateAPIKey(key) {
    const apiKey = await APIKey.findOne({ key, active: true })
    if (!apiKey) {
      return null
    }
    apiKey.lastUsed = new Date()
    await apiKey.save()
    return apiKey
  },
}

