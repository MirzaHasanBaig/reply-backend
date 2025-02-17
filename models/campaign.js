const mongoose = require ("mongoose")
const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    sequence: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sequence",
      required: true,
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
    status: {
      type: String,
      enum: ["draft", "active", "paused", "completed"],
      default: "draft",
    },
    startDate: Date,
    endDate: Date,
    tags: [String],
    performance: {
      sent: { type: Number, default: 0 },
      opened: { type: Number, default: 0 },
      clicked: { type: Number, default: 0 },
      replied: { type: Number, default: 0 },
      converted: { type: Number, default: 0 },
      bounced: { type: Number, default: 0 },
      optedOut: { type: Number, default: 0 },
    },
    abTest: {
      isActive: { type: Boolean, default: false },
      variants: [
        {
          name: String,
          performance: {
            sent: { type: Number, default: 0 },
            opened: { type: Number, default: 0 },
            clicked: { type: Number, default: 0 },
            replied: { type: Number, default: 0 },
            converted: { type: Number, default: 0 },
          },
        },
      ],
      winningVariant: String,
      metric: { type: String, enum: ["opens", "clicks", "replies", "conversions"] },
    },
    aiInsights: [
      {
        date: Date,
        insight: String,
        action: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

campaignSchema.index({ owner: 1, status: 1 })
campaignSchema.index({ team: 1, status: 1 })
campaignSchema.index({ startDate: 1, endDate: 1 })

module.exports =  mongoose.model("Campaign", campaignSchema)

