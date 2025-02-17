const ABTestService = require ("../services/abTestService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = ABTestController = {
  async createTest(req, res) {
    try {
      const test = await ABTestService.createTest(req.body, req.user.id)
      res.status(201).json(test)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getTest(req, res) {
    try {
      const test = await ABTestService.getTest(req.params.id)
      res.status(200).json(test)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateTest(req, res) {
    try {
      const test = await ABTestService.updateTest(req.params.id, req.body)
      res.status(200).json(test)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteTest(req, res) {
    try {
      await ABTestService.deleteTest(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listTests(req, res) {
    try {
      const tests = await ABTestService.listTests(req.user.id, req.query)
      res.status(200).json(tests)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async startTest(req, res) {
    try {
      const test = await ABTestService.startTest(req.params.id)
      res.status(200).json(test)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async endTest(req, res) {
    try {
      const test = await ABTestService.endTest(req.params.id)
      res.status(200).json(test)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getTestResults(req, res) {
    try {
      const results = await ABTestService.getTestResults(req.params.id)
      res.status(200).json(results)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

