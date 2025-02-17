const Website = require ("../models/website.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = WebsiteService = {
  async createWebsite(websiteData, userId) {
    const website = new Website({
      ...websiteData,
      createdBy: userId,
    })
    await website.save()
    return website
  },

  async getWebsite(websiteId) {
    const website = await Website.findById(websiteId)
    if (!website) {
      throw new NotFoundError("Website not found")
    }
    return website
  },

  async updateWebsite(websiteId, updateData) {
    const website = await Website.findByIdAndUpdate(websiteId, updateData, { new: true })
    if (!website) {
      throw new NotFoundError("Website not found")
    }
    return website
  },

  async deleteWebsite(websiteId) {
    const result = await Website.findByIdAndDelete(websiteId)
    if (!result) {
      throw new NotFoundError("Website not found")
    }
  },

  async createPage(websiteId, pageData) {
    const website = await Website.findById(websiteId)
    if (!website) {
      throw new NotFoundError("Website not found")
    }
    website.pages.push(pageData)
    await website.save()
    return website.pages[website.pages.length - 1]
  },

  async updatePage(websiteId, pageId, updateData) {
    const website = await Website.findById(websiteId)
    if (!website) {
      throw new NotFoundError("Website not found")
    }
    const pageIndex = website.pages.findIndex((page) => page._id.toString() === pageId)
    if (pageIndex === -1) {
      throw new NotFoundError("Page not found")
    }
    Object.assign(website.pages[pageIndex], updateData)
    await website.save()
    return website.pages[pageIndex]
  },

  async deletePage(websiteId, pageId) {
    const website = await Website.findById(websiteId)
    if (!website) {
      throw new NotFoundError("Website not found")
    }
    website.pages = website.pages.filter((page) => page._id.toString() !== pageId)
    await website.save()
  },

  async updatePageLayout(websiteId, pageId, layout) {
    const website = await Website.findById(websiteId)
    if (!website) {
      throw new NotFoundError("Website not found")
    }
    const page = website.pages.id(pageId)
    if (!page) {
      throw new NotFoundError("Page not found")
    }
    page.layout = layout
    await website.save()
    return page
  },
}

