const { Page }  = require("../models/Page")
const { logger }  = require("../utils/logger")

export const createPage = async (userId, pageData: any) => {
  try {
    const page = new Page({ ...pageData, author: userId })
    await page.save()
    logger.info(`Page created: ${page.id}`)
    return page
  } catch (error) {
    logger.error(`Error creating page: ${error}`)
    throw error
  }
}

export const updatePage = async (pageId, updateData: any) => {
  try {
    const page = await Page.findByIdAndUpdate(pageId, updateData, { new: true })
    if (!page) throw new Error("Page not found")
    logger.info(`Page updated: ${pageId}`)
    return page
  } catch (error) {
    logger.error(`Error updating page: ${error}`)
    throw error
  }
}

export const deletePage = async (pageId) => {
  try {
    await Page.findByIdAndDelete(pageId)
    logger.info(`Page deleted: ${pageId}`)
  } catch (error) {
    logger.error(`Error deleting page: ${error}`)
    throw error
  }
}

export const getPages = async (filters: any = {}) => {
  try {
    const pages = await Page.find(filters)
    return pages
  } catch (error) {
    logger.error(`Error fetching pages: ${error}`)
    throw error
  }
}

export const updateHeader = async (headerData: any) => {
  try {
    const header = await Page.findOneAndUpdate({ type: "header" }, headerData, { new: true, upsert: true })
    logger.info(`Header updated`)
    return header
  } catch (error) {
    logger.error(`Error updating header: ${error}`)
    throw error
  }
}

export const updateFooter = async (footerData: any) => {
  try {
    const footer = await Page.findOneAndUpdate({ type: "footer" }, footerData, { new: true, upsert: true })
    logger.info(`Footer updated`)
    return footer
  } catch (error) {
    logger.error(`Error updating footer: ${error}`)
    throw error
  }
}

