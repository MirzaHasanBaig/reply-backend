const mongoose = require ("mongoose")
const variationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: mongoose.Schema.Types.Mixed,
  weight: {
    type: Number,
    default: 1,
  },
})

const abTestSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["email_subject", "email_content", "landing_page", "chatbot_message"],
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "running", "paused", "completed"],
      default: "draft",
    },
    startDate: Date,
    endDate: Date,
    targetAudience: {
      type: { type: String, enum: ["all", "segment", "custom"] },
      segmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Segment" },
      customFilter: mongoose.Schema.Types.Mixed,
    },
    variations: [variationSchema],
    metrics: {
      primary: { type: String, required: true },
      secondary: [String],
    },
    results: {
      totalParticipants: { type: Number, default: 0 },
      conversionRates: mongoose.Schema.Types.Mixed,
      winningVariation: { type: mongoose.Schema.Types.ObjectId, ref: "Variation" },
      confidenceLevel: Number,
    },
  },
  {
    timestamps: true,
  },
)

abTestSchema.index({ team: 1, status: 1 })
abTestSchema.index({ startDate: 1, endDate: 1 })

module.exports =  mongoose.model("ABTest", abTestSchema)

