const mongoose = require ("mongoose")
const dealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    stage: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    closeDate: Date,
    probability: {
      type: Number,
      min: 0,
      max: 100,
    },
    notes: String,
    activities: [
      {
        type: {
          type: String,
          enum: ["call", "email", "meeting", "task"],
        },
        description: String,
        date: Date,
        outcome: String,
      },
    ],
    tags: [String],
    customFields: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
    relatedDocuments: [
      {
        name: String,
        url: String,
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["open", "won", "lost"],
      default: "open",
    },
    pipeline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pipeline",
    },
    competitors: [
      {
        name: String,
        strengths: [String],
        weaknesses: [String],
      },
    ],
    decisionMakers: [
      {
        contact: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Contact",
        },
        role: String,
        influence: { type: Number, min: 1, max: 10 },
      },
    ],
    forecast: {
      bestCase: Number,
      worstCase: Number,
      mostLikely: Number,
    },
    lostReason: String,
  },
  {
    timestamps: true,
  },
)

dealSchema.index({ owner: 1, stage: 1, closeDate: 1 })
dealSchema.index({ team: 1, status: 1 })
dealSchema.index({ contact: 1 })
dealSchema.index({ pipeline: 1, stage: 1 })

module.exports =  mongoose.model("Deal", dealSchema)

