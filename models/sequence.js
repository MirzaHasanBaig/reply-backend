const mongoose = require ("mongoose")
const stepSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["email", "call", "linkedin", "sms", "whatsapp", "task"],
    required: true,
  },
  content: String,
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Template",
  },
  delay: {
    type: Number,
    default: 0,
  },
  condition: String,
  aiAssisted: {
    type: Boolean,
    default: false,
  },
  aiSuggestion: String,
  videoUrl: String,
})

const sequenceSchema = new mongoose.Schema(
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
    steps: [stepSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    tags: [String],
    category: String,
    performance: {
      opens: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
      replies: { type: Number, default: 0 },
      bounces: { type: Number, default: 0 },
      meetings: { type: Number, default: 0 },
    },
    aiGenerated: {
      type: Boolean,
      default: false,
    },
    lastOptimized: Date,
    scheduleSettings: {
      timezone: String,
      workingHours: {
        start: String,
        end: String,
      },
      workingDays: [String],
    },
    abTestVariants: [
      {
        name: String,
        steps: [stepSchema],
      },
    ],
  },
  {
    timestamps: true,
  },
)

sequenceSchema.index({ owner: 1, name: 1 })
sequenceSchema.index({ team: 1, isActive: 1 })
sequenceSchema.index({ tags: 1 })

module.exports =  mongoose.model("Sequence", sequenceSchema)

