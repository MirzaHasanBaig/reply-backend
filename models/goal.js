const mongoose = require ("mongoose")
const goalSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["revenue", "deals_closed", "meetings_booked", "emails_sent", "custom"],
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "quarterly", "yearly"],
      required: true,
    },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed", "failed"],
      default: "not_started",
    },
    relatedCampaigns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
      },
    ],
    notifications: {
      enabled: { type: Boolean, default: true },
      frequency: {
        type: String,
        enum: ["daily", "weekly", "on_completion"],
        default: "weekly",
      },
    },
    milestones: [
      {
        name: String,
        target: Number,
        achieved: { type: Boolean, default: false },
        achievedAt: Date,
      },
    ],
    customMetric: {
      name: String,
      calculation: String,
    },
    linkedGoals: [
      {
        goal: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Goal",
        },
        relationship: { type: String, enum: ["parent", "child", "related"] },
      },
    ],
  },
  {
    timestamps: true,
  },
)

goalSchema.index({ owner: 1, type: 1, startDate: 1, endDate: 1 })
goalSchema.index({ team: 1, status: 1 })

module.exports =  mongoose.model("Goal", goalSchema)

