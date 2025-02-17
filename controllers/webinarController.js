const WebinarService = require ("../services/webinarService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = WebinarController = {
  async createWebinar(req, res) {
    try {
      const webinar = await WebinarService.createWebinar(req.body, req.user.id)
      res.status(201).json(webinar)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getWebinar(req, res) {
    try {
      const webinar = await WebinarService.getWebinar(req.params.id)
      res.status(200).json(webinar)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateWebinar(req, res) {
    try {
      const webinar = await WebinarService.updateWebinar(req.params.id, req.body)
      res.status(200).json(webinar)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteWebinar(req, res) {
    try {
      await WebinarService.deleteWebinar(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listWebinars(req, res) {
    try {
      const webinars = await WebinarService.listWebinars(req.user.id, req.query)
      res.status(200).json(webinars)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async registerAttendee(req, res) {
    try {
      const webinar = await WebinarService.registerAttendee(req.params.id, req.body.attendeeId)
      res.status(200).json(webinar)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async startWebinar(req, res) {
    try {
      const webinar = await WebinarService.startWebinar(req.params.id)
      res.status(200).json(webinar)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async endWebinar(req, res) {
    try {
      const webinar = await WebinarService.endWebinar(req.params.id)
      res.status(200).json(webinar)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

