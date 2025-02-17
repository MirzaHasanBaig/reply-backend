const mongoose = require ("mongoose")
const rewardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    pointsCost: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["badge", "discount", "gift", "experience"],
      required: true,
    },
    image: String,
    expirationDate: Date,
    quantity: {
      type: Number,
      default: -1, // -1 for unlimited
    },
    eligibility: {
      minPoints: Number,
      requiredBadges: [String],
      teamRestriction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    },
    redemptions: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        date: Date,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "expired"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
)

rewardSchema.index({ name: 1, type: 1 })
rewardSchema.index({ pointsCost: 1, status: 1 })
rewardSchema.index({ "eligibility.teamRestriction": 1 })

module.exports =  mongoose.model("Reward", rewardSchema)

