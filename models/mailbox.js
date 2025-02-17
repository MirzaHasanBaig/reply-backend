const mongoose = require ("mongoose")
const mailboxSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      enum: ["gmail", "outlook", "other"],
      required: true,
    },
    credentials: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      encrypted: true,
    },
    dailySendLimit: {
      type: Number,
      default: 500,
    },
    warmupStatus: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
    warmupProgress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    deliverabilityScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    spamScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    lastSyncedAt: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
    settings: {
      signature: String,
      replyTo: String,
      fromName: String,
    },
    googlePostmasterMetrics: {
      lastUpdated: Date,
      domainReputation: String,
      spamRate: Number,
    },
    mailToasterSettings: {
      enabled: { type: Boolean, default: false },
      warmupRate: { type: Number, min: 1, max: 100, default: 10 },
      targetDailyVolume: Number,
    },
    healthCheck: {
      lastChecked: Date,
      issues: [String],
      recommendations: [String],
    },
  },
  {
    timestamps: true,
  },
)

mailboxSchema.index({ user: 1, email: 1 })
mailboxSchema.index({ warmupStatus: 1, isActive: 1 })

module.exports =  mongoose.model("Mailbox", mailboxSchema)

