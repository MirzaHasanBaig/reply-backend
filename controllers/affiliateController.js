const AffiliateService = require ("../services/affiliateService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = AffiliateController = {
  async createAffiliate(req, res) {
    try {
      const affiliate = await AffiliateService.createAffiliate(req.body, req.user.id)
      res.status(201).json(affiliate)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getAffiliate(req, res) {
    try {
      const affiliate = await AffiliateService.getAffiliate(req.params.id)
      res.status(200).json(affiliate)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateAffiliate(req, res) {
    try {
      const affiliate = await AffiliateService.updateAffiliate(req.params.id, req.body)
      res.status(200).json(affiliate)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteAffiliate(req, res) {
    try {
      await AffiliateService.deleteAffiliate(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listAffiliates(req, res) {
    try {
      const affiliates = await AffiliateService.listAffiliates(req.user.id, req.query)
      res.status(200).json(affiliates)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async generateAffiliateLink(req, res) {
    try {
      const link = await AffiliateService.generateAffiliateLink(req.params.id, req.body)
      res.status(200).json({ link })
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getAffiliateStats(req, res) {
    try {
      const stats = await AffiliateService.getAffiliateStats(req.params.id)
      res.status(200).json(stats)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

