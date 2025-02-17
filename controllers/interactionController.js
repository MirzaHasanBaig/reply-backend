const InteractionService = require ("../services/interactionService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = InteractionController = {
  async createInteraction(req, res) {
    try {
      const interaction = await InteractionService.createInteraction(req.body, req.user.id)
      res.status(201).json(interaction)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getInteraction(req, res) {
    try {
      const interaction = await InteractionService.getInteraction(req.params.id)
      res.status(200).json(interaction)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateInteraction(req, res) {
    try {
      const interaction = await InteractionService.updateInteraction(req.params.id, req.body)
      res.status(200).json(interaction)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteInteraction(req, res) {
    try {
      await InteractionService.deleteInteraction(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listInteractions(req, res) {
    try {
      const interactions = await InteractionService.listInteractions(req.user.id, req.query)
      res.status(200).json(interactions)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

