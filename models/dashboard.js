const mongoose = require ("mongoose")
const widgetSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["chart", "metric", "list", "custom"],
    required: true,
  },
  title: String,
  dataSource: {
    type: { type: String, enum: ["report", "custom_query", "api"] },
    config: mongoose.Schema.Types.Mixed,
  },
  visualization: {
    type: { type: String, enum: ["bar", "line", "pie", "table", "number", "gauge"] },
    config: mongoose.Schema.Types.Mixed,
  },
  position: {
    x: Number,
    y: Number,
    width: Number,
    height: Number,
  },
  refreshInterval: Number,
})

const dashboardSchema = new mongoose.Schema(
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
    widgets: [widgetSchema],
    layout: {
      type: { type: String, enum: ["grid", "freeform"], default: "grid" },
      columns: { type: Number, default: 12 },
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    permissions: {
      viewableBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      editableBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    tags: [String],
    category: String,
  },
  {
    timestamps: true,
  },
)

dashboardSchema.index({ owner: 1, name: 1 })
dashboardSchema.index({ team: 1, isDefault: 1 })

module.exports =  mongoose.model("Dashboard", dashboardSchema)

