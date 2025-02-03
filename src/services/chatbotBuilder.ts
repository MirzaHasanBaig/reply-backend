const { Chatbot }  = require("../models/Chatbot")

export const createChatbot = async (name, nodes: any[]) => {
  const chatbot = new Chatbot({ name, nodes })
  await chatbot.save()
  return chatbot
}

export const updateChatbot = async (id, name, nodes: any[]) => {
  const chatbot = await Chatbot.findByIdAndUpdate(id, { name, nodes }, { new: true })
  return chatbot
}

export const deleteChatbot = async (id) => {
  await Chatbot.findByIdAndDelete(id)
}

