const mongoose = require ("mongoose")
const actionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["send_email", "create_task", "update_contact", "add_to_sequence", "webhook", "delay", "condition"],
    required: true,
  },
  config: mongoose.Schema.Types.Mixed,
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Action" }],
})

const workflowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trigger: {
      type: {
        type: String,
        enum: ["contact_created", "deal_stage_changed", "form_submitted", "custom_event"],
        required: true,
      },
      config: mongoose.Schema.Types.Mixed,
    },
    actions: [actionSchema],
    isActive: {
      type: Boolean,
      default: false,
    },
    stats: {
      timesTriggered: { type: Number, default: 0 },
      lastTriggered: Date,
      successRate: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  },
)

workflowSchema.index({ team: 1, isActive: 1 })
workflowSchema.index({ "trigger.type": 1 })

module.exports =  mongoose.model("Workflow", workflowSchema)

