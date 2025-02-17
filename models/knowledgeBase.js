const mongoose = require ("mongoose")
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  tags: [String],
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
  views: {
    type: Number,
    default: 0,
  },
  helpfulVotes: {
    type: Number,
    default: 0,
  },
  notHelpfulVotes: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
})

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
})

const knowledgeBaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    categories: [categorySchema],
    articles: [articleSchema],
    settings: {
      allowComments: { type: Boolean, default: true },
      requireApproval: { type: Boolean, default: false },
      visibilityScope: {
        type: String,
        enum: ["public", "team", "customers"],
        default: "public",
      },
    },
  },
  {
    timestamps: true,
  },
)

knowledgeBaseSchema.index({ team: 1 })
knowledgeBaseSchema.index({ "articles.status": 1 })
knowledgeBaseSchema.index({ "articles.tags": 1 })

module.exports =  mongoose.model("KnowledgeBase", knowledgeBaseSchema)

