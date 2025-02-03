const mongoose  = require("mongoose")

const companySchema = new mongoose.Schema({
  name: { type: String,required: true },
  domain: { type: String,required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Company = mongoose.model("Company", companySchema)

