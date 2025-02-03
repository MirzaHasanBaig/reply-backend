const { Calendar }  = require("../models/Calendar")
const { logger }  = require("../utils/logger")

export const createEvent = async (userId, eventData: any) => {
  try {
    const event = new Calendar({ ...eventData, user: userId })
    await event.save()
    logger.info(`Event created: ${event.id}`)
    return event
  } catch (error) {
    logger.error(`Error creating event: ${error}`)
    throw error
  }
}

export const updateEvent = async (eventId, updateData: any) => {
  try {
    const event = await Calendar.findByIdAndUpdate(eventId, updateData, { new: true })
    if (!event) throw new Error("Event not found")
    logger.info(`Event updated: ${eventId}`)
    return event
  } catch (error) {
    logger.error(`Error updating event: ${error}`)
    throw error
  }
}

export const deleteEvent = async (eventId) => {
  try {
    await Calendar.findByIdAndDelete(eventId)
    logger.info(`Event deleted: ${eventId}`)
  } catch (error) {
    logger.error(`Error deleting event: ${error}`)
    throw error
  }
}

export const getEvents = async (userId, startDate: Date, endDate: Date) => {
  try {
    const events = await Calendar.find({
      user: userId,
      startTime: { $gte: startDate, $lte: endDate },
    }).sort("startTime")
    return events
  } catch (error) {
    logger.error(`Error fetching events: ${error}`)
    throw error
  }
}

