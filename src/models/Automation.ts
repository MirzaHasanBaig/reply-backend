const mongoose  = require("mongoose")

const automationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String,required: true },
  trigger: { type: mongoose.Schema.Types.Mixed, required: true },
  rules: [{ type: mongoose.Schema.Types.Mixed }],
  actions: [{ type: mongoose.Schema.Types.Mixed, required: true }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Automation = mongoose.model("Automation", automationSchema)

