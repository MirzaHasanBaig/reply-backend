const mongoose = require ("mongoose")
const aiAssistantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    enum: ["gpt-3.5-turbo", "gpt-4", "custom"],
  },
  customInstructions: {
    type: String,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

aiAssistantSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

const AIAssistant = mongoose.model("AIAssistant", aiAssistantSchema)

module.exports =  AIAssistant

