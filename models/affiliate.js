const mongoose = require ("mongoose")
const affiliateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    commissionRate: {
      type: Number,
      required: true,
    },
    paymentInfo: {
      method: {
        type: String,
        enum: ["paypal", "bank_transfer", "stripe"],
        required: true,
      },
      details: mongoose.Schema.Types.Mixed,
    },
    balance: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    referrals: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        signupDate: Date,
        plan: String,
        commission: Number,
      },
    ],
    payouts: [
      {
        amount: Number,
        date: Date,
        status: {
          type: String,
          enum: ["pending", "processed", "failed"],
        },
      },
    ],
    marketingMaterials: [
      {
        type: { type: String, enum: ["banner", "text_link", "email_template"] },
        content: String,
        url: String,
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
)

affiliateSchema.index({ user: 1, code: 1 })
affiliateSchema.index({ status: 1 })

module.exports =  mongoose.model("Affiliate", affiliateSchema)

