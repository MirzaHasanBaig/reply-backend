const { LandingPage }  = require("../models/LandingPage")
const { logger }  = require("../utils/logger")

export const createLandingPage = async (userId, pageData: any) => {
  try {
    const landingPage = new LandingPage({ ...pageData, user: userId })
    await landingPage.save()
    logger.info(`Landing page created: ${landingPage.id}`)
    return landingPage
  } catch (error) {
    logger.error(`Error creating landing page: ${error}`)
    throw error
  }
}

export const publishLandingPage = async (pageId) => {
  const landingPage = await LandingPage.findById(pageId)
  if (!landingPage) {
    throw new Error("Landing page not found")
  }

  landingPage.isPublished = true
  await landingPage.save()
  logger.info(`Landing page published: ${pageId}`)
}

export const trackPageView = async (pageId) => {
  const landingPage = await LandingPage.findById(pageId)
  if (!landingPage) {
    throw new Error("Landing page not found")
  }

  landingPage.analytics.views += 1
  await landingPage.save()
}

export const trackConversion = async (pageId) => {
  const landingPage = await LandingPage.findById(pageId)
  if (!landingPage) {
    throw new Error("Landing page not found")
  }

  landingPage.analytics.conversions += 1
  await landingPage.save()
}

