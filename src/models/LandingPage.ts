const mongoose  = require("mongoose")

const landingPageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String,required: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
  url: { type: String,required: true, unique: true },
  isPublished: { type: Boolean, default: false },
  analytics: {
    views: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const LandingPage = mongoose.model("LandingPage", landingPageSchema)

