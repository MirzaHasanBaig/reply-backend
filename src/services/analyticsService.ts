const { Analytics }  = require("../models/Analytics")
const { logger }  = require("../utils/logger")

export const trackEvent = async (userId, eventData: any) => {
  try {
    const event = new Analytics({ ...eventData, user: userId })
    await event.save()
    logger.info(`Event tracked: ${event.id}`)
  } catch (error) {
    logger.error(`Error tracking event: ${error}`)
    throw error
  }
}

export const getAnalytics = async (filters: any = {}) => {
  try {
    const analytics = await Analytics.aggregate([
      { $match: filters },
      { $group: { _id: "$eventType", count: { $sum: 1 } } },
    ])
    return analytics
  } catch (error) {
    logger.error(`Error fetching analytics: ${error}`)
    throw error
  }
}

export const getSalesForecast = async (userId, period) => {
  try {
    const forecast = await Analytics.aggregate([
      { $match: { user: userId, eventType: "sale" } },
      { $group: { _id: null, totalSales: { $sum: "$amount" } } },
    ])

    const totalSales = forecast[0]?.totalSales || 0
    const forecastMultiplier = period === "month" ? 1.1 : 1.5

    return totalSales * forecastMultiplier
  } catch (error) {
    logger.error(`Error generating sales forecast: ${error}`)
    throw error
  }
}

export const getCustomerRetentionRate = async (userId, startDate: Date, endDate: Date) => {
  try {
    const startCustomers = await Analytics.countDocuments({
      user: userId,
      eventType: "customer",
      timestamp: { $lt: startDate },
    })

    const endCustomers = await Analytics.countDocuments({
      user: userId,
      eventType: "customer",
      timestamp: { $lt: endDate },
    })

    const churnedCustomers = await Analytics.countDocuments({
      user: userId,
      eventType: "churn",
      timestamp: { $gte: startDate, $lt: endDate },
    })

    const retentionRate = (endCustomers - churnedCustomers) / startCustomers
    return retentionRate
  } catch (error) {
    logger.error(`Error calculating customer retention rate: ${error}`)
    throw error
  }
}

