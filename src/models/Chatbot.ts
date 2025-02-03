const mongoose  = require("mongoose")

const nodeSchema = new mongoose.Schema({
  type: { type: String,required: true },
  content: { type: String,required: true },
  next: [{ type: mongoose.Schema.Types.ObjectId, ref: "Node" }],
})

const chatbotSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String,required: true },
  nodes: [nodeSchema],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Chatbot = mongoose.model("Chatbot", chatbotSchema)

