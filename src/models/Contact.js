const mongoose  = require("mongoose")

const contactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String,required: true },
  email: { type: String,required: true },
  phone: { type: String },
  whatsapp: { type: String,},
  tags: [{ type: String,}],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "ContactGroup" }],
  leadScore: { type: Number, default: 0 },
  leadStatus: { type: String,enum: ["active", "block", "unsubscribed", "delete"], default: "active" },
  source: { type: mongoose.Schema.Types.ObjectId, ref: "LeadSource" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Contact", contactSchema);

