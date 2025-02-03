const { ContentCalendar }  = require("../models/ContentCalendar")
const { logger }  = require("../utils/logger")

export const createContentCalendarItem = async (userId, itemData: any) => {
  try {
    const item = new ContentCalendar({ ...itemData, user: userId })
    await item.save()
    logger.info(`Content calendar item created: ${item.id}`)
    return item
  } catch (error) {
    logger.error(`Error creating content calendar item: ${error}`)
    throw error
  }
}

export const getContentCalendar = async (userId, startDate: Date, endDate: Date) => {
  try {
    const items = await ContentCalendar.find({
      user: userId,
      scheduledDate: { $gte: startDate, $lte: endDate },
    }).sort("scheduledDate")
    return items
  } catch (error) {
    logger.error(`Error fetching content calendar: ${error}`)
    throw error
  }
}

// Implement other content calendar-related functions (update item, delete item, etc.)

