const mongoose  = require("mongoose")
const bcrypt  = require("bcrypt")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String,required: true, unique: true },
  password: { type: String,required: true },
  role: { type: String,enum: ["client", "editor", "support", "view"], default: "client" },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  companyRole: { type: String,enum: ["admin", "editor", "support"] },
  googleId: { type: String},
  microsoftId: { type: String},
  otpSecret: { type: String},
  authenticatorSecret: { type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

const User = mongoose.model("User", userSchema)

module.exports = {User};

