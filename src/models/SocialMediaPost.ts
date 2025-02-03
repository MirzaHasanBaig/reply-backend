const mongoose  = require("mongoose")

const socialMediaPostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String,required: true },
  platform: { type: String,required: true },
  scheduledFor: { type: Date },
  status: { type: String,enum: ["draft", "scheduled", "posted"], default: "draft" },
  analytics: {
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const SocialMediaPost = mongoose.model("SocialMediaPost", socialMediaPostSchema)

