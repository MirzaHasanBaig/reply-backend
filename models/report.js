const mongoose = require ("mongoose")
const reportSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["campaign_performance", "sales_pipeline", "team_activity", "goal_progress", "custom"],
      required: true,
    },
    dateRange: {
      start: Date,
      end: Date,
    },
    filters: mongoose.Schema.Types.Mixed,
    metrics: [String],
    visualizations: [
      {
        type: {
          type: String,
          enum: ["bar", "line", "pie", "table", "funnel", "heatmap"],
        },
        config: mongoose.Schema.Types.Mixed,
      },
    ],
    schedule: {
      frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
      },
      recipients: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    lastGenerated: Date,
    isTemplate: {
      type: Boolean,
      default: false,
    },
    customQuery: String,
    dataSource: {
      type: { type: String, enum: ["mongodb", "external_api", "file_upload"] },
      config: mongoose.Schema.Types.Mixed,
    },
    permissions: {
      viewableBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      editableBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    exportFormats: [{ type: String, enum: ["pdf", "csv", "excel"] }],
  },
  {
    timestamps: true,
  },
)

reportSchema.index({ owner: 1, type: 1 })
reportSchema.index({ team: 1, isTemplate: 1 })

module.exports =  mongoose.model("Report", reportSchema)

