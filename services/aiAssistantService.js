const AIAssistant = require ("../models/aiAssistant.js")
const { NotFoundError } = require ("../utils/errors.js")
const { openai } = require ("../config/openai.js")

module.exports = AIAssistantService = {
  async createAssistant(assistantData, userId) {
    const assistant = new AIAssistant({
      ...assistantData,
      owner: userId,
    })
    await assistant.save()
    return assistant
  },

  async getAssistant(assistantId, userId) {
    const assistant = await AIAssistant.findOne({ _id: assistantId, owner: userId })
    if (!assistant) {
      throw new NotFoundError("AI Assistant not found")
    }
    return assistant
  },

  async updateAssistant(assistantId, updateData, userId) {
    const assistant = await AIAssistant.findOneAndUpdate({ _id: assistantId, owner: userId }, updateData, { new: true })
    if (!assistant) {
      throw new NotFoundError("AI Assistant not found")
    }
    return assistant
  },

  async deleteAssistant(assistantId, userId) {
    const result = await AIAssistant.findOneAndDelete({ _id: assistantId, owner: userId })
    if (!result) {
      throw new NotFoundError("AI Assistant not found")
    }
  },

  async listAssistants(userId, query) {
    const { page = 1, limit = 10 } = query
    const assistants = await AIAssistant.find({ owner: userId })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await AIAssistant.countDocuments({ owner: userId })

    return {
      assistants,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },

  async getAssistantResponse(assistantId, userId, message) {
    const assistant = await this.getAssistant(assistantId, userId)

    const response = await openai.createChatCompletion({
      model: assistant.model,
      messages: [
        { role: "system", content: assistant.customInstructions },
        { role: "user", content: message },
      ],
    })

    return response.data.choices[0].message.content
  },
}

