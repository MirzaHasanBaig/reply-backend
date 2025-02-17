const GoalService = require ("../services/goalService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = GoalController = {
  async createGoal(req, res) {
    try {
      const goal = await GoalService.createGoal(req.body, req.user.id)
      res.status(201).json(goal)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getGoal(req, res) {
    try {
      const goal = await GoalService.getGoal(req.params.id)
      res.status(200).json(goal)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateGoal(req, res) {
    try {
      const goal = await GoalService.updateGoal(req.params.id, req.body)
      res.status(200).json(goal)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteGoal(req, res) {
    try {
      await GoalService.deleteGoal(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listGoals(req, res) {
    try {
      const goals = await GoalService.listGoals(req.user.id, req.query)
      res.status(200).json(goals)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateGoalProgress(req, res) {
    try {
      const goal = await GoalService.updateGoalProgress(req.params.id, req.body.progress)
      res.status(200).json(goal)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

