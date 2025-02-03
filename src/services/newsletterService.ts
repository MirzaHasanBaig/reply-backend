const { Newsletter }  = require("../models/Newsletter")
const { sendEmail }  = require("../utils/emailSender")
const { logger }  = require("../utils/logger")

export const signupNewsletter = async (email) => {
  try {
    const newsletter = await Newsletter.findOneAndUpdate({ email }, { email }, { upsert: true, new: true })
    logger.info(`Newsletter signup: ${email}`)
    return newsletter
  } catch (error) {
    logger.error(`Error signing up for newsletter: ${error}`)
    throw error
  }
}

export const sendNewsletter = async (subject, content) => {
  try {
    const subscribers = await Newsletter.find()
    for (const subscriber of subscribers) {
      await sendEmail(subscriber.email, subject, content)
    }
    logger.info(`Newsletter sent to ${subscribers.length} subscribers`)
  } catch (error) {
    logger.error(`Error sending newsletter: ${error}`)
    throw error
  }
}

