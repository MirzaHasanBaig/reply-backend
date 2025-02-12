const mongoose  = require("mongoose")

const contactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String,required: true },
  number: { type: Number,default: 0 },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Contact", contactSchema);

