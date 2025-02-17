const mongoose = require ("mongoose")
const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ["user", "ai", "human"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  metadata: mongoose.Schema.Types.Mixed,
})

const aiChatSchema = new mongoose.Schema(
  {
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [messageSchema],
    status: {
      type: String,
      enum: ["active", "paused", "completed"],
      default: "active",
    },
    context: String,
    lastHumanInteraction: Date,
    aiModel: String,
    performance: {
      responseTimes: [Number],
      userSatisfactionScore: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    intents: [String],
    entities: [
      {
        name: String,
        value: String,
      },
    ],
    suggestedActions: [
      {
        type: { type: String, enum: ["email", "call", "meeting", "task"] },
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

aiChatSchema.index({ contact: 1, user: 1, status: 1 })
aiChatSchema.index({ lastHumanInteraction: -1 })

module.exports =  mongoose.model("AIChat", aiChatSchema)

