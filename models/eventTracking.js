const mongoose = require ("mongoose")
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: String,
  properties: mongoose.Schema.Types.Mixed,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
  },
  session: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
    enum: ["web", "mobile", "api"],
    required: true,
  },
})

const eventTrackingSchema = new mongoose.Schema(
  {
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    events: [eventSchema],
    settings: {
      enabledEvents: [String],
      samplingRate: {
        type: Number,
        min: 0,
        max: 1,
        default: 1,
      },
      retentionPeriod: {
        type: Number,
        default: 90, // days
      },
    },
  },
  {
    timestamps: true,
  },
)

eventTrackingSchema.index({ team: 1, "events.timestamp": -1 })
eventTrackingSchema.index({ "events.name": 1, "events.category": 1 })

module.exports =  mongoose.model("EventTracking", eventTrackingSchema)

