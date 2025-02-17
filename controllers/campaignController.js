const CampaignService = require ("../services/campaignService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = CampaignController = {
  async createCampaign(req, res) {
    try {
      const campaign = await CampaignService.createCampaign(req.body, req.user.id)
      res.status(201).json(campaign)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getCampaign(req, res) {
    try {
      const campaign = await CampaignService.getCampaign(req.params.id)
      res.status(200).json(campaign)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateCampaign(req, res) {
    try {
      const campaign = await CampaignService.updateCampaign(req.params.id, req.body)
      res.status(200).json(campaign)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteCampaign(req, res) {
    try {
      await CampaignService.deleteCampaign(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listCampaigns(req, res) {
    try {
      const campaigns = await CampaignService.listCampaigns(req.user.id, req.query)
      res.status(200).json(campaigns)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async addContact(req, res) {
    try {
      const campaign = await CampaignService.addContact(req.params.id, req.body.contactId)
      res.status(200).json(campaign)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async removeContact(req, res) {
    try {
      const campaign = await CampaignService.removeContact(req.params.id, req.params.contactId)
      res.status(200).json(campaign)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

