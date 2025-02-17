const mongoose = require ("mongoose")
const crypto = require ("crypto")
const apiKeySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  permissions: [
    {
      type: String,
      enum: ["read", "write", "delete"],
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
  lastUsed: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

apiKeySchema.pre("save", function (next) {
  if (!this.isModified("key")) {
    return next()
  }
  this.key = crypto.randomBytes(32).toString("hex")
  this.updatedAt = Date.now()
  next()
})

const APIKey = mongoose.model("APIKey", apiKeySchema)

module.exports =  APIKey

