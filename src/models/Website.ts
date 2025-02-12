const mongoose  = require("mongoose")

const websiteSchema = new mongoose.Schema({
  name: { type: String,required: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  published: { type: Boolean, default: false },
  domain: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Website = mongoose.model("Website", websiteSchema)

