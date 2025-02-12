const mongoose  = require("mongoose")

const contactGroupSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String,required: true },
  status: { type: String },
  tags: [{ type: String}],
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("ContactGroup", contactGroupSchema);

