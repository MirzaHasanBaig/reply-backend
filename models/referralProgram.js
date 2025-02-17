const mongoose = require ("mongoose")
const referralSchema = new mongoose.Schema({
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  referred: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "expired"],
    default: "pending",
  },
  referralCode: {
    type: String,
    required: true,
  },
  dateReferred: {
    type: Date,
    default: Date.now,
  },
  dateCompleted: Date,
  reward: {
    type: { type: String, enum: ["points", "discount", "credit"] },
    value: Number,
  },
})

const referralProgramSchema = new mongoose.Schema(
  {
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    rewardType: {
      type: String,
      enum: ["points", "discount", "credit"],
      required: true,
    },
    rewardValue: {
      type: Number,
      required: true,
    },
    referralExpiration: {
      type: Number,
      default: 30, // days
    },
    referrals: [referralSchema],
    termsAndConditions: String,
    analytics: {
      totalReferrals: { type: Number, default: 0 },
      successfulReferrals: { type: Number, default: 0 },
      conversionRate: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  },
)

referralProgramSchema.index({ team: 1, isActive: 1 })
referralProgramSchema.index({ "referrals.referrer": 1, "referrals.status": 1 })

module.exports =  mongoose.model("ReferralProgram", referralProgramSchema)

