const mongoose = require ("mongoose")
const messageSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "image", "button", "quick_reply"],
    required: true,
  },
  content: mongoose.Schema.Types.Mixed,
  conditions: [
    {
      variable: String,
      operator: String,
      value: mongoose.Schema.Types.Mixed,
    },
  ],
})

const nodeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["message", "input", "condition", "api_call"],
    required: true,
  },
  messages: [messageSchema],
  inputVariable: String,
  apiConfig: {
    url: String,
    method: String,
    headers: mongoose.Schema.Types.Mixed,
    body: mongoose.Schema.Types.Mixed,
  },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Node" }],
})

const chatbotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "active", "inactive"],
      default: "draft",
    },
    startNode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Node",
    },
    nodes: [nodeSchema],
    integrations: [
      {
        type: { type: String, enum: ["website", "facebook", "whatsapp", "telegram"] },
        config: mongoose.Schema.Types.Mixed,
      },
    ],
    analytics: {
      totalConversations: { type: Number, default: 0 },
      averageConversationLength: { type: Number, default: 0 },
      topIntents: [{ intent: String, count: Number }],
    },
  },
  {
    timestamps: true,
  },
)

chatbotSchema.index({ team: 1, status: 1 })
chatbotSchema.index({ createdBy: 1 })

module.exports =  mongoose.model("Chatbot", chatbotSchema)

