import { features } from "process"

const mongoose  = require("mongoose")

const productSchema = new mongoose.Schema({
  name: { type: String,required: true },
  price: { type: Number, required: true },
  description: { type: String },
  features: {type: Object},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Product = mongoose.model("Product", productSchema)

