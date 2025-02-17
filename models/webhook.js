const mongoose = require ("mongoose")
const webhookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  events: [
    {
      type: String,
      enum: ["message.sent", "message.received", "call.started", "call.ended", "contact.created", "contact.updated"],
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

webhookSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

const Webhook = mongoose.model("Webhook", webhookSchema)

module.exports =  Webhook

