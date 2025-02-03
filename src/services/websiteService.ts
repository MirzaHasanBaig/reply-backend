const { Website }  = require("../models/Website")
const { logger }  = require("../utils/logger")

export const createWebsite = async (userId, websiteData: any) => {
  try {
    const website = new Website({ ...websiteData, creator: userId })
    await website.save()
    logger.info(`Website created: ${website.id}`)
    return website
  } catch (error) {
    logger.error(`Error creating website: ${error}`)
    throw error
  }
}

export const updateWebsite = async (websiteId, updateData: any) => {
  try {
    const website = await Website.findByIdAndUpdate(websiteId, updateData, { new: true })
    if (!website) throw new Error("Website not found")
    logger.info(`Website updated: ${websiteId}`)
    return website
  } catch (error) {
    logger.error(`Error updating website: ${error}`)
    throw error
  }
}

export const deleteWebsite = async (websiteId) => {
  try {
    await Website.findByIdAndDelete(websiteId)
    logger.info(`Website deleted: ${websiteId}`)
  } catch (error) {
    logger.error(`Error deleting website: ${error}`)
    throw error
  }
}

export const getWebsites = async (filters: any = {}) => {
  try {
    const websites = await Website.find(filters)
    return websites
  } catch (error) {
    logger.error(`Error fetching websites: ${error}`)
    throw error
  }
}

