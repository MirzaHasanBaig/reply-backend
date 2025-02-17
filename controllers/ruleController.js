const RuleService = require ("../services/ruleService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = RuleController = {
  async createRule(req, res) {
    try {
      const rule = await RuleService.createRule(req.body, req.user.id)
      res.status(201).json(rule)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getRule(req, res) {
    try {
      const rule = await RuleService.getRule(req.params.id)
      res.status(200).json(rule)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateRule(req, res) {
    try {
      const rule = await RuleService.updateRule(req.params.id, req.body)
      res.status(200).json(rule)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteRule(req, res) {
    try {
      await RuleService.deleteRule(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listRules(req, res) {
    try {
      const rules = await RuleService.listRules(req.user.id, req.query)
      res.status(200).json(rules)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async activateRule(req, res) {
    try {
      const rule = await RuleService.activateRule(req.params.id)
      res.status(200).json(rule)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deactivateRule(req, res) {
    try {
      const rule = await RuleService.deactivateRule(req.params.id)
      res.status(200).json(rule)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

