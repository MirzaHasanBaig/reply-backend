const mongoose  = require("mongoose")

const newsletterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String,required: true },
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Newsletter = mongoose.model("Newsletter", newsletterSchema)

