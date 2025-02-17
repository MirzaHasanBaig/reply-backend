const Webinar = require ("../models/webinar.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = WebinarService = {
  async createWebinar(webinarData, userId) {
    const webinar = new Webinar({
      ...webinarData,
      host: userId,
    })
    await webinar.save()
    return webinar
  },

  async getWebinar(webinarId) {
    const webinar = await Webinar.findById(webinarId)
    if (!webinar) {
      throw new NotFoundError("Webinar not found")
    }
    return webinar
  },

  async updateWebinar(webinarId, updateData) {
    const webinar = await Webinar.findByIdAndUpdate(webinarId, updateData, { new: true })
    if (!webinar) {
      throw new NotFoundError("Webinar not found")
    }
    return webinar
  },

  async deleteWebinar(webinarId) {
    const result = await Webinar.findByIdAndDelete(webinarId)
    if (!result) {
      throw new NotFoundError("Webinar not found")
    }
  },

  async listWebinars(userId, query) {
    const { page = 1, limit = 10, status } = query
    const filter = { host: userId }

    if (status) {
      filter.status = status
    }

    const webinars = await Webinar.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ startDate: 1 })

    const total = await Webinar.countDocuments(filter)

    return {
      webinars,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },

  async registerAttendee(webinarId, attendeeId) {
    const webinar = await Webinar.findById(webinarId)
    if (!webinar) {
      throw new NotFoundError("Webinar not found")
    }
    if (!webinar.registeredAttendees.includes(attendeeId)) {
      webinar.registeredAttendees.push(attendeeId)
      webinar.analytics.registrations += 1
      await webinar.save()
    }
    return webinar
  },

  async startWebinar(webinarId) {
    const webinar = await Webinar.findById(webinarId)
    if (!webinar) {
      throw new NotFoundError("Webinar not found")
    }
    webinar.status = "live"
    await webinar.save()
    return webinar
  },

  async endWebinar(webinarId) {
    const webinar = await Webinar.findById(webinarId)
    if (!webinar) {
      throw new NotFoundError("Webinar not found")
    }
    webinar.status = "completed"
    await webinar.save()
    return webinar
  },
}

