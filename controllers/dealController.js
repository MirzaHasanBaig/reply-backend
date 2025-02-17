const DealService = require ("../services/dealService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = DealController = {
  async createDeal(req, res) {
    try {
      const deal = await DealService.createDeal(req.body, req.user.id)
      res.status(201).json(deal)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getDeal(req, res) {
    try {
      const deal = await DealService.getDeal(req.params.id)
      res.status(200).json(deal)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateDeal(req, res) {
    try {
      const deal = await DealService.updateDeal(req.params.id, req.body)
      res.status(200).json(deal)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteDeal(req, res) {
    try {
      await DealService.deleteDeal(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listDeals(req, res) {
    try {
      const deals = await DealService.listDeals(req.user.id, req.query)
      res.status(200).json(deals)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateDealStage(req, res) {
    try {
      const deal = await DealService.updateDealStage(req.params.id, req.body.stage)
      res.status(200).json(deal)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

