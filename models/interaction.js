const mongoose = require ("mongoose")
const interactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["email", "call", "linkedin", "sms", "whatsapp", "meeting"],
      required: true,
    },
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: String,
    status: {
      type: String,
      enum: ["scheduled", "sent", "opened", "clicked", "replied", "completed", "failed"],
      required: true,
    },
    metadata: mongoose.Schema.Types.Mixed,
    sentAt: Date,
    openedAt: Date,
    clickedAt: Date,
    repliedAt: Date,
    completedAt: Date,
    failedAt: Date,
    failureReason: String,
    aiAssisted: {
      type: Boolean,
      default: false,
    },
    aiSuggestion: String,
    qualityScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    recordingUrl: { type: String, encrypted: true },
    linkedInActions: [
      {
        type: { type: String, enum: ["connect", "message", "like", "comment"] },
        timestamp: Date,
        details: String,
      },
    ],
    emailThread: [
      {
        direction: { type: String, enum: ["incoming", "outgoing"] },
        content: String,
        timestamp: Date,
      },
    ],
  },
  {
    timestamps: true,
  },
)

interactionSchema.index({ contact: 1, type: 1, createdAt: -1 })
interactionSchema.index({ campaign: 1, type: 1, status: 1 })
interactionSchema.index({ user: 1, createdAt: -1 })

module.exports =  mongoose.model("Interaction", interactionSchema)

