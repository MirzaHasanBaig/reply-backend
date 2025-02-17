const Chatbot = require ("../models/chatbot.js")
const { NotFoundError } = require ("../utils/errors.js")
const { openai } = require ("../config/openai.js")

module.exports = ChatbotService = {
  async createChatbot(chatbotData) {
    const chatbot = new Chatbot(chatbotData)
    await chatbot.save()
    return chatbot
  },

  async getChatbot(id) {
    const chatbot = await Chatbot.findById(id)
    if (!chatbot) {
      throw new NotFoundError("Chatbot not found")
    }
    return chatbot
  },

  async updateChatbot(id, updateData) {
    const chatbot = await Chatbot.findByIdAndUpdate(id, updateData, { new: true })
    if (!chatbot) {
      throw new NotFoundError("Chatbot not found")
    }
    return chatbot
  },

  async deleteChatbot(id) {
    const result = await Chatbot.findByIdAndDelete(id)
    if (!result) {
      throw new NotFoundError("Chatbot not found")
    }
  },

  async sendMessage(id, { message }) {
    const chatbot = await Chatbot.findById(id)
    if (!chatbot) {
      throw new NotFoundError("Chatbot not found")
    }

    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `${chatbot.context}\nHuman: ${message}\nAI:`,
      max_tokens: 150,
      n: 1,
      stop: ["Human:", "AI:"],
    })

    const aiResponse = response.data.choices[0].text.trim()
    chatbot.conversation.push({ role: "human", content: message })
    chatbot.conversation.push({ role: "ai", content: aiResponse })
    await chatbot.save()

    return { message: aiResponse }
  },
}

