const mongoose = require ("mongoose")
const integrationSchema = new mongoose.Schema(
  {
    user: {
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
      enum: ["crm", "zapier", "slack", "calendar", "voip", "linkedin"],
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    config: {
      apiKey: { type: String, encrypted: true },
      webhookUrl: String,
      refreshToken: { type: String, encrypted: true },
      expiresAt: Date,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "error"],
      default: "active",
    },
    lastSyncedAt: Date,
    errorLog: [
      {
        message: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    syncSettings: {
      direction: { type: String, enum: ["inbound", "outbound", "bidirectional"] },
      frequency: { type: String, enum: ["realtime", "hourly", "daily"] },
      entities: [{ type: String, enum: ["contacts", "deals", "activities"] }],
    },
    mappings: [
      {
        sourceField: String,
        targetField: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

integrationSchema.index({ user: 1, type: 1, provider: 1 })
integrationSchema.index({ team: 1, type: 1 })

module.exports =  mongoose.model("Integration", integrationSchema)

