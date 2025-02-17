const Goal = require ("../models/goal.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = GoalService = {
  async createGoal(goalData, userId) {
    const goal = new Goal({
      ...goalData,
      owner: userId,
    })
    await goal.save()
    return goal
  },

  async getGoal(goalId) {
    const goal = await Goal.findById(goalId)
    if (!goal) {
      throw new NotFoundError("Goal not found")
    }
    return goal
  },

  async updateGoal(goalId, updateData) {
    const goal = await Goal.findByIdAndUpdate(goalId, updateData, { new: true })
    if (!goal) {
      throw new NotFoundError("Goal not found")
    }
    return goal
  },

  async deleteGoal(goalId) {
    const result = await Goal.findByIdAndDelete(goalId)
    if (!result) {
      throw new NotFoundError("Goal not found")
    }
  },

  async listGoals(userId, query) {
    const { page = 1, limit = 10, type, status } = query
    const filter = { owner: userId }

    if (type) {
      filter.type = type
    }

    if (status) {
      filter.status = status
    }

    const goals = await Goal.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await Goal.countDocuments(filter)

    return {
      goals,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },

  async updateGoalProgress(goalId, progress) {
    const goal = await Goal.findById(goalId)
    if (!goal) {
      throw new NotFoundError("Goal not found")
    }
    goal.current = progress
    if (goal.current >= goal.target) {
      goal.status = "completed"
    }
    await goal.save()
    return goal
  },
}

