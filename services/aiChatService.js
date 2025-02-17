const AIChat = require ("../models/aiChat.js")
const { NotFoundError } = require ("../utils/errors.js")
const { openai } = require ("../config/openai.js")

module.exports = AIChatService = {
  async createChat(chatData, userId) {
    const chat = new AIChat({
      ...chatData,
      user: userId,
    })
    await chat.save()
    return chat
  },

  async getChat(chatId) {
    const chat = await AIChat.findById(chatId)
    if (!chat) {
      throw new NotFoundError("AI Chat not found")
    }
    return chat
  },

  async sendMessage(chatId, messageData) {
    const chat = await AIChat.findById(chatId)
    if (!chat) {
      throw new NotFoundError("AI Chat not found")
    }

    const { content } = messageData
    chat.messages.push({ sender: "user", content })

    const response = await openai.createCompletion({
      model: chat.aiModel || "text-davinci-002",
      prompt: `${chat.context}\nHuman: ${content}\nAI:`,
      max_tokens: 150,
      n: 1,
      stop: ["Human:", "AI:"],
    })

    const aiResponse = response.data.choices[0].text.trim()
    chat.messages.push({ sender: "ai", content: aiResponse })

    await chat.save()
    return chat.messages[chat.messages.length - 1]
  },

  async listChats(userId, query) {
    const { page = 1, limit = 10, status } = query
    const filter = { user: userId }

    if (status) {
      filter.status = status
    }

    const chats = await AIChat.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await AIChat.countDocuments(filter)

    return {
      chats,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },

  async endChat(chatId) {
    const chat = await AIChat.findById(chatId)
    if (!chat) {
      throw new NotFoundError("AI Chat not found")
    }
    chat.status = "completed"
    await chat.save()
    return chat
  },
}

