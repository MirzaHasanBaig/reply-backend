const mongoose = require ("mongoose")
const ruleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    trigger: {
      event: {
        type: String,
        enum: ["deal_closed", "task_completed", "email_opened", "form_submitted", "custom"],
        required: true,
      },
      conditions: [
        {
          field: String,
          operator: {
            type: String,
            enum: ["equals", "not_equals", "contains", "greater_than", "less_than"],
          },
          value: mongoose.Schema.Types.Mixed,
        },
      ],
    },
    actions: [
      {
        type: {
          type: String,
          enum: ["send_email", "create_task", "update_contact", "add_points", "assign_badge", "create_deal"],
          required: true,
        },
        config: mongoose.Schema.Types.Mixed,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    executionCount: {
      type: Number,
      default: 0,
    },
    lastExecuted: Date,
  },
  {
    timestamps: true,
  },
)

ruleSchema.index({ team: 1, "trigger.event": 1 })
ruleSchema.index({ isActive: 1 })

module.exports =  mongoose.model("Rule", ruleSchema)

