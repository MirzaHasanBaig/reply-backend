const mongoose = require ("mongoose")
const elementSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "image", "button", "form", "video", "custom"],
    required: true,
  },
  content: mongoose.Schema.Types.Mixed,
  style: mongoose.Schema.Types.Mixed,
  position: {
    x: Number,
    y: Number,
  },
  size: {
    width: Number,
    height: Number,
  },
})

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  layout: [elementSchema],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
  },
  isPublished: { type: Boolean, default: false },
})

const websiteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      unique: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    pages: [pageSchema],
    theme: {
      name: String,
      customCSS: String,
      fonts: [String],
      colors: {
        primary: String,
        secondary: String,
        background: String,
        text: String,
      },
    },
    navigation: [
      {
        label: String,
        url: String,
      },
    ],
    seoSettings: {
      googleAnalyticsId: String,
      sitemapEnabled: { type: Boolean, default: true },
    },
    integrations: [
      {
        type: { type: String, enum: ["form", "chat", "analytics"] },
        provider: String,
        config: mongoose.Schema.Types.Mixed,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
)

websiteSchema.index({ team: 1, domain: 1 })
websiteSchema.index({ "pages.slug": 1 })

module.exports =  mongoose.model("Website", websiteSchema)

