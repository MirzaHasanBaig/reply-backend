const mongoose = require ("mongoose")
const webinarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    timezone: String,
    maxAttendees: Number,
    registeredAttendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
    status: {
      type: String,
      enum: ["scheduled", "live", "completed", "cancelled"],
      default: "scheduled",
    },
    recordingUrl: String,
    presentationUrl: String,
    chatLog: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        message: String,
        timestamp: Date,
      },
    ],
    followUpSequence: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sequence",
    },
    analytics: {
      registrations: { type: Number, default: 0 },
      attendees: { type: Number, default: 0 },
      averageWatchTime: Number,
      questions: { type: Number, default: 0 },
      feedback: [
        {
          rating: Number,
          comment: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  },
)

webinarSchema.index({ host: 1, startDate: 1 })
webinarSchema.index({ team: 1, status: 1 })

module.exports =  mongoose.model("Webinar", webinarSchema)

