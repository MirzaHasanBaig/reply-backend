const mongoose  = require("mongoose")
const bcrypt  = require("bcrypt")
const { SubscriptIcon } = require("lucide-react")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String,required: true, unique: true },
  emailverified: { type: Boolean,default: false },
  password: { type: String,required: true },
  role: { type: String,enum: ["client", "editor", "support", "view"], default: "client" },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  googleId: { type: String},
  microsoftId: { type: String},
  otpSecret: { type: String},
  authenticatorSecret: { type: String},
  isAuthenticatorSecret: { type: Boolean,default: false},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  SubscriptId: { type: String },
  Plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  planExpiry: { type: Date,default: Date.now },
})

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

const User = mongoose.model("User", userSchema)

module.exports = {User};

