const SequenceService = require ("../services/sequenceService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = SequenceController = {
  async createSequence(req, res) {
    try {
      const sequence = await SequenceService.createSequence(req.body, req.user.id)
      res.status(201).json(sequence)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getSequence(req, res) {
    try {
      const sequence = await SequenceService.getSequence(req.params.id)
      res.status(200).json(sequence)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateSequence(req, res) {
    try {
      const sequence = await SequenceService.updateSequence(req.params.id, req.body)
      res.status(200).json(sequence)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteSequence(req, res) {
    try {
      await SequenceService.deleteSequence(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listSequences(req, res) {
    try {
      const sequences = await SequenceService.listSequences(req.user.id, req.query)
      res.status(200).json(sequences)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async addStep(req, res) {
    try {
      const sequence = await SequenceService.addStep(req.params.id, req.body)
      res.status(200).json(sequence)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateStep(req, res) {
    try {
      const sequence = await SequenceService.updateStep(req.params.id, req.params.stepId, req.body)
      res.status(200).json(sequence)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async removeStep(req, res) {
    try {
      const sequence = await SequenceService.removeStep(req.params.id, req.params.stepId)
      res.status(200).json(sequence)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

