const mongoose = require ("mongoose")
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    sku: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    category: String,
    tags: [String],
    attributes: [
      {
        name: String,
        value: String,
      },
    ],
    images: [String],
    inventory: {
      quantity: { type: Number, default: 0 },
      lowStockThreshold: Number,
    },
    relatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    customFields: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "discontinued"],
      default: "active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  {
    timestamps: true,
  },
)

productSchema.index({ name: 1, sku: 1 })
productSchema.index({ category: 1, tags: 1 })
productSchema.index({ team: 1, status: 1 })

module.exports =  mongoose.model("Product", productSchema)

