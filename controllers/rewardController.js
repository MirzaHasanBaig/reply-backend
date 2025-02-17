const RewardService = require ("../services/rewardService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = RewardController = {
  async createReward(req, res) {
    try {
      const reward = await RewardService.createReward(req.body, req.user.id)
      res.status(201).json(reward)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getReward(req, res) {
    try {
      const reward = await RewardService.getReward(req.params.id)
      res.status(200).json(reward)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateReward(req, res) {
    try {
      const reward = await RewardService.updateReward(req.params.id, req.body)
      res.status(200).json(reward)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteReward(req, res) {
    try {
      await RewardService.deleteReward(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listRewards(req, res) {
    try {
      const rewards = await RewardService.listRewards(req.user.id, req.query)
      res.status(200).json(rewards)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async redeemReward(req, res) {
    try {
      const reward = await RewardService.redeemReward(req.params.id, req.user.id)
      res.status(200).json(reward)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

