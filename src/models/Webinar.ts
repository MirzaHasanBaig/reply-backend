const mongoose  = require("mongoose")

const webinarSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String,required: true },
  description: { type },
  scheduledFor: { type: Date, required: true },
  duration: { type: Number, required: true },
  maxAttendees: { type: Number },
  registeredAttendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "WebinarAttendee" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Webinar = mongoose.model("Webinar", webinarSchema)

