const mongoose = require ("mongoose")
const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["multiple_choice", "rating", "open_ended", "yes_no"],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  options: [String],
  isRequired: {
    type: Boolean,
    default: false,
  },
})

const responseSchema = new mongoose.Schema({
  respondent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      answer: mongoose.Schema.Types.Mixed,
    },
  ],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
})

const surveySchema = new mongoose.Schema(
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
    questions: [questionSchema],
    responses: [responseSchema],
    status: {
      type: String,
      enum: ["draft", "active", "closed"],
      default: "draft",
    },
    startDate: Date,
    endDate: Date,
    distributionChannels: [
      {
        type: { type: String, enum: ["email", "sms", "website", "link"] },
        config: mongoose.Schema.Types.Mixed,
      },
    ],
    analytics: {
      totalResponses: { type: Number, default: 0 },
      averageCompletionTime: Number,
      completionRate: Number,
    },
  },
  {
    timestamps: true,
  },
)

surveySchema.index({ team: 1, status: 1 })
surveySchema.index({ startDate: 1, endDate: 1 })

module.exports =  mongoose.model("Survey", surveySchema)

