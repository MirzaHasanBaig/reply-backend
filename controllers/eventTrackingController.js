const EventTrackingService = require ("../services/eventTrackingService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = EventTrackingController = {
  async trackEvent(req, res) {
    try {
      const event = await EventTrackingService.trackEvent(req.body, req.user.id)
      res.status(201).json(event)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getEvent(req, res) {
    try {
      const event = await EventTrackingService.getEvent(req.params.id)
      res.status(200).json(event)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listEvents(req, res) {
    try {
      const events = await EventTrackingService.listEvents(req.user.id, req.query)
      res.status(200).json(events)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getEventStats(req, res) {
    try {
      const stats = await EventTrackingService.getEventStats(req.query)
      res.status(200).json(stats)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteEvent(req, res) {
    try {
      await EventTrackingService.deleteEvent(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

