const PipelineService = require ("../services/pipelineService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = PipelineController = {
  async createPipeline(req, res) {
    try {
      const pipeline = await PipelineService.createPipeline(req.body, req.user.id)
      res.status(201).json(pipeline)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getPipeline(req, res) {
    try {
      const pipeline = await PipelineService.getPipeline(req.params.id)
      res.status(200).json(pipeline)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updatePipeline(req, res) {
    try {
      const pipeline = await PipelineService.updatePipeline(req.params.id, req.body)
      res.status(200).json(pipeline)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deletePipeline(req, res) {
    try {
      await PipelineService.deletePipeline(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listPipelines(req, res) {
    try {
      const pipelines = await PipelineService.listPipelines(req.user.id, req.query)
      res.status(200).json(pipelines)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async addStage(req, res) {
    try {
      const pipeline = await PipelineService.addStage(req.params.id, req.body)
      res.status(200).json(pipeline)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async removeStage(req, res) {
    try {
      const pipeline = await PipelineService.removeStage(req.params.id, req.params.stageId)
      res.status(200).json(pipeline)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

