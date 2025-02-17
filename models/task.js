const mongoose = require ("mongoose")
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    dueDate: Date,
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    relatedTo: {
      type: {
        type: String,
        enum: ["contact", "campaign", "sequence", "deal", "product"],
      },
      id: mongoose.Schema.Types.ObjectId,
    },
    notes: [
      {
        content: String,
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    reminders: [
      {
        time: Date,
        method: {
          type: String,
          enum: ["email", "notification", "sms"],
        },
      },
    ],
    completedAt: Date,
    linkedInteractions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interaction",
      },
    ],
    pointsAwarded: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
)

taskSchema.index({ assignedTo: 1, status: 1, dueDate: 1 })
taskSchema.index({ team: 1, status: 1 })
taskSchema.index({ "relatedTo.type": 1, "relatedTo.id": 1 })

module.exports =  mongoose.model("Task", taskSchema)

