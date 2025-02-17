const TriggerService = require ("../services/triggerService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = TriggerController = {
  async createTrigger(req, res) {
    try {
      const trigger = await TriggerService.createTrigger(req.body, req.user.id)
      res.status(201).json(trigger)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getTrigger(req, res) {
    try {
      const trigger = await TriggerService.getTrigger(req.params.id)
      res.status(200).json(trigger)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateTrigger(req, res) {
    try {
      const trigger = await TriggerService.updateTrigger(req.params.id, req.body)
      res.status(200).json(trigger)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteTrigger(req, res) {
    try {
      await TriggerService.deleteTrigger(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listTriggers(req, res) {
    try {
      const triggers = await TriggerService.listTriggers(req.user.id, req.query)
      res.status(200).json(triggers)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async toggleTriggerStatus(req, res) {
    try {
      const trigger = await TriggerService.toggleTriggerStatus(req.params.id)
      res.status(200).json(trigger)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

