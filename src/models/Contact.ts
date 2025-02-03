const mongoose  = require("mongoose")

const contactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String,required: true },
  email: { type: String,required: true },
  phone: { type },
  whatsapp: { type },
  tags: [{ type }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "ContactGroup" }],
  leadScore: { type: Number, default: 0 },
  leadStatus: { type: mongoose.Schema.Types.ObjectId, ref: "LeadStatus" },
  source: { type: mongoose.Schema.Types.ObjectId, ref: "LeadSource" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Contact = mongoose.model("Contact", contactSchema)

