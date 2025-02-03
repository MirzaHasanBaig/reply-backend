const { Chat }  = require("../models/Chat")
const { logger }  = require("../utils/logger")

export const createChat = async (userId, supportId) => {
  try {
    const chat = new Chat({ user: userId, support: supportId })
    await chat.save()
    logger.info(`Chat created: ${chat.id}`)
    return chat
  } catch (error) {
    logger.error(`Error creating chat: ${error}`)
    throw error
  }
}

export const sendMessage = async (chatId, senderId, content) => {
  try {
    const chat = await Chat.findById(chatId)
    if (!chat) throw new Error("Chat not found")

    chat.messages.push({ sender: senderId, content })
    await chat.save()
    logger.info(`Message sent in chat: ${chatId}`)
    return chat
  } catch (error) {
    logger.error(`Error sending message: ${error}`)
    throw error
  }
}

export const getChats = async (userId, role) => {
  try {
    const query = role === "support" ? { support: userId } : { user: userId }
    const chats = await Chat.find(query).populate("user support", "name email")
    return chats
  } catch (error) {
    logger.error(`Error fetching chats: ${error}`)
    throw error
  }
}

