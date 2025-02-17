const mongoose = require ("mongoose")
const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["email", "sms", "whatsapp", "linkedin"],
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
    isShared: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    category: String,
    variables: [String],
    version: {
      type: Number,
      default: 1,
    },
    performance: {
      uses: { type: Number, default: 0 },
      opens: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
      replies: { type: Number, default: 0 },
    },
    aiGenerated: {
      type: Boolean,
      default: false,
    },
    lastModifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    conditionalContent: [
      {
        condition: String,
        content: String,
      },
    ],
    attachments: [
      {
        name: String,
        url: String,
        type: String,
      },
    ],
    previewText: String,
    subject: String,
    fromName: String,
    replyTo: String,
  },
  {
    timestamps: true,
  },
)

templateSchema.index({ owner: 1, type: 1, tags: 1 })
templateSchema.index({ team: 1, isShared: 1 })

module.exports =  mongoose.model("Template", templateSchema)

