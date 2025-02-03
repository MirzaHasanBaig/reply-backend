const { Webinar }  = require("../models/Webinar")
const { User }  = require("../models/User")
const { sendEmail }  = require("../utils/emailSender")
const { logger }  = require("../utils/logger")

export const createWebinar = async (userId, webinarData: any) => {
  try {
    const webinar = new Webinar({ ...webinarData, host: userId })
    await webinar.save()
    logger.info(`Webinar created: ${webinar.id}`)
    return webinar
  } catch (error) {
    logger.error(`Error creating webinar: ${error}`)
    throw error
  }
}

export const registerForWebinar = async (webinarId, userId) => {
  try {
    const webinar = await Webinar.findById(webinarId)
    const user = await User.findById(userId)
    if (!webinar || !user) throw new Error("Webinar or User not found")

    if (webinar.attendees.includes(userId)) {
      throw new Error("User already registered for this webinar")
    }

    webinar.attendees.push(userId)
    await webinar.save()

    await sendEmail(
      user.email,
      "Webinar Registration Confirmation",
      `You've successfully registered for ${webinar.title}`,
    )

    logger.info(`User ${userId} registered for webinar: ${webinarId}`)
  } catch (error) {
    logger.error(`Error registering for webinar: ${error}`)
    throw error
  }
}

export const startWebinar = async (webinarId) => {
  try {
    const webinar = await Webinar.findById(webinarId)
    if (!webinar) throw new Error("Webinar not found")

    webinar.status = "live"
    await webinar.save()

    // Send notification to all attendees
    for (const attendeeId of webinar.attendees) {
      const attendee = await User.findById(attendeeId)
      if (attendee) {
        await sendEmail(attendee.email, "Webinar Starting Soon", `The webinar ${webinar.title} is about to begin!`)
      }
    }

    logger.info(`Webinar started: ${webinarId}`)
  } catch (error) {
    logger.error(`Error starting webinar: ${error}`)
    throw error
  }
}

export const endWebinar = async (webinarId) => {
  try {
    const webinar = await Webinar.findById(webinarId)
    if (!webinar) throw new Error("Webinar not found")

    webinar.status = "ended"
    await webinar.save()

    // Send follow-up emails to all attendees
    for (const attendeeId of webinar.attendees) {
      const attendee = await User.findById(attendeeId)
      if (attendee) {
        await sendEmail(
          attendee.email,
          "Webinar Follow-up",
          `Thank you for attending ${webinar.title}. Here's a recording link...`,
        )
      }
    }

    logger.info(`Webinar ended: ${webinarId}`)
  } catch (error) {
    logger.error(`Error ending webinar: ${error}`)
    throw error
  }
}

export const getWebinarAnalytics = async (webinarId) => {
  try {
    const webinar = await Webinar.findById(webinarId)
    if (!webinar) throw new Error("Webinar not found")

    const analytics = {
      registeredAttendees: webinar.attendees.length,
      actualAttendees: webinar.actualAttendees?.length || 0,
      engagementRate: (webinar.actualAttendees?.length || 0) / webinar.attendees.length,
      // Add more analytics as needed
    }

    logger.info(`Webinar analytics retrieved: ${webinarId}`)
    return analytics
  } catch (error) {
    logger.error(`Error retrieving webinar analytics: ${error}`)
    throw error
  }
}

