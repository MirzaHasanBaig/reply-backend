const mongoose  = require("mongoose")

const productSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String,required: true },
  description: { type },
  price: { type: Number, required: true },
  category: { type },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Product = mongoose.model("Product", productSchema)

