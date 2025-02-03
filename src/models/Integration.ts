const mongoose  = require("mongoose")

const integrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String,required: true },
  type: { type: String,required: true },
  config: { type: mongoose.Schema.Types.Mixed },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Integration = mongoose.model("Integration", integrationSchema)

