const mongoose = require ("mongoose")
const triggerSchema = new mongoose.Schema(
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
    event: {
      type: String,
      enum: [
        "email_opened",
        "email_clicked",
        "form_submitted",
        "deal_stage_changed",
        "task_completed",
        "contact_created",
        "contact_updated",
        "deal_created",
        "deal_updated",
        "meeting_scheduled",
      ],
      required: true,
    },
    conditions: [
      {
        field: String,
        operator: {
          type: String,
          enum: ["equals", "not_equals", "contains", "greater_than", "less_than", "in", "not_in"],
        },
        value: mongoose.Schema.Types.Mixed,
      },
    ],
    actions: [
      {
        type: {
          type: String,
          enum: [
            "send_email",
            "create_task",
            "update_contact",
            "notify_user",
            "add_to_sequence",
            "update_deal",
            "create_deal",
            "send_slack_message",
            "create_calendar_event",
          ],
        },
        config: mongoose.Schema.Types.Mixed,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastTriggered: Date,
    triggerCount: {
      type: Number,
      default: 0,
    },
    cooldownPeriod: {
      type: Number,
      default: 0,
    },
    priority: {
      type: Number,
      default: 0,
    },
    tags: [String],
    metadata: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  },
)

triggerSchema.index({ owner: 1, event: 1, isActive: 1 })
triggerSchema.index({ team: 1, isActive: 1 })

module.exports =  mongoose.model("Trigger", triggerSchema)

