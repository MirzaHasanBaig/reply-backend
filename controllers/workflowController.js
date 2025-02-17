const WorkflowService = require ("../services/workflowService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = WorkflowController = {
  async createWorkflow(req, res) {
    try {
      const workflow = await WorkflowService.createWorkflow(req.body)
      res.status(201).json(workflow)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getWorkflow(req, res) {
    try {
      const workflow = await WorkflowService.getWorkflow(req.params.id)
      res.status(200).json(workflow)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateWorkflow(req, res) {
    try {
      const workflow = await WorkflowService.updateWorkflow(req.params.id, req.body)
      res.status(200).json(workflow)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteWorkflow(req, res) {
    try {
      await WorkflowService.deleteWorkflow(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async executeWorkflow(req, res) {
    try {
      const result = await WorkflowService.executeWorkflow(req.params.id, req.body)
      res.status(200).json(result)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

