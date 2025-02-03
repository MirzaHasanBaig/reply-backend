const { Feedback }  = require("../models/Feedback")
const { logger }  = require("../utils/logger")

export const submitFeedback = async (userId, feedbackData: any) => {
  try {
    const feedback = new Feedback({ ...feedbackData, user: userId })
    await feedback.save()
    logger.info(`Feedback submitted: ${feedback.id}`)
    return feedback
  } catch (error) {
    logger.error(`Error submitting feedback: ${error}`)
    throw error
  }
}

export const getFeedback = async (filters: any = {}) => {
  try {
    const feedback = await Feedback.find(filters).sort("-createdAt")
    return feedback
  } catch (error) {
    logger.error(`Error fetching feedback: ${error}`)
    throw error
  }
}

export const respondToFeedback = async (feedbackId, response) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(feedbackId, { response, respondedAt: new Date() }, { new: true })
    if (!feedback) throw new Error("Feedback not found")
    logger.info(`Responded to feedback: ${feedbackId}`)
    return feedback
  } catch (error) {
    logger.error(`Error responding to feedback: ${error}`)
    throw error
  }
}

