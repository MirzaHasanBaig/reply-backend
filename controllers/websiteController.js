const WebsiteService = require ("../services/websiteService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = WebsiteController = {
  async createWebsite(req, res) {
    try {
      const website = await WebsiteService.createWebsite(req.body, req.user.id)
      res.status(201).json(website)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getWebsite(req, res) {
    try {
      const website = await WebsiteService.getWebsite(req.params.id)
      res.status(200).json(website)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateWebsite(req, res) {
    try {
      const website = await WebsiteService.updateWebsite(req.params.id, req.body)
      res.status(200).json(website)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteWebsite(req, res) {
    try {
      await WebsiteService.deleteWebsite(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listWebsites(req, res) {
    try {
      const websites = await WebsiteService.listWebsites(req.user.id, req.query)
      res.status(200).json(websites)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async publishWebsite(req, res) {
    try {
      const website = await WebsiteService.publishWebsite(req.params.id)
      res.status(200).json(website)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async unpublishWebsite(req, res) {
    try {
      const website = await WebsiteService.unpublishWebsite(req.params.id)
      res.status(200).json(website)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

