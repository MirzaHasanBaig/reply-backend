const { Chatbot }  = require("../models/Chatbot")
const { logger }  = require("../utils/logger")

export const createChatbot = async (userId, chatbotData: any) => {
  try {
    const chatbot = new Chatbot({ ...chatbotData, user: userId })
    await chatbot.save()
    logger.info(`Chatbot created: ${chatbot.id}`)
    return chatbot
  } catch (error) {
    logger.error(`Error creating chatbot: ${error}`)
    throw error
  }
}

export const processChatbotMessage = async (chatbotId, message) => {
  const chatbot = await Chatbot.findById(chatbotId)
  if (!chatbot) {
    throw new Error("Chatbot not found")
  }

  // Implement chatbot logic here
  // This is a simplified example
  const responseNode = chatbot.nodes.find((node) => node.content.toLowerCase().includes(message.toLowerCase()))
  return responseNode ? responseNode.content : "I'm sorry, I don't understand."
}

