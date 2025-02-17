const mongoose = require ("mongoose")
const stageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  order: { type: Number, required: true },
  probability: { type: Number, min: 0, max: 100 },
  expectedDuration: { type: Number, comment: "Expected duration in days" },
})

const pipelineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    stages: [stageSchema],
    isDefault: {
      type: Boolean,
      default: false,
    },
    dealTypes: [String],
    currency: {
      type: String,
      default: "USD",
    },
    metrics: {
      totalDeals: { type: Number, default: 0 },
      totalValue: { type: Number, default: 0 },
      averageTimeToClose: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  },
)

pipelineSchema.index({ owner: 1, name: 1 })
pipelineSchema.index({ team: 1, isDefault: 1 })

module.exports =  mongoose.model("Pipeline", pipelineSchema)

