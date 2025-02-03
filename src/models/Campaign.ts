const mongoose  = require("mongoose")

const campaignSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String,required: true },
  type: { type: String,enum: ["email", "sms", "whatsapp"], required: true },
  content: { type: String,required: true },
  template: { type: mongoose.Schema.Types.ObjectId, ref: "Template" },
  segment: { type: mongoose.Schema.Types.ObjectId, ref: "Segment" },
  schedule: { type: Date },
  status: { type: String,enum: ["draft", "scheduled", "sent"], default: "draft" },
  analytics: {
    sent: { type: Number, default: 0 },
    delivered: { type: Number, default: 0 },
    opened: { type: Number, default: 0 },
    clicked: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Campaign = mongoose.model("Campaign", campaignSchema)

