const Campaign = require ("../models/campaign.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = CampaignService = {
  async createCampaign(campaignData, userId) {
    const campaign = new Campaign({
      ...campaignData,
      owner: userId,
    })
    await campaign.save()
    return campaign
  },

  async getCampaign(campaignId) {
    const campaign = await Campaign.findById(campaignId)
    if (!campaign) {
      throw new NotFoundError("Campaign not found")
    }
    return campaign
  },

  async updateCampaign(campaignId, updateData) {
    const campaign = await Campaign.findByIdAndUpdate(campaignId, updateData, { new: true })
    if (!campaign) {
      throw new NotFoundError("Campaign not found")
    }
    return campaign
  },

  async deleteCampaign(campaignId) {
    const result = await Campaign.findByIdAndDelete(campaignId)
    if (!result) {
      throw new NotFoundError("Campaign not found")
    }
  },

  async listCampaigns(userId, query) {
    const { page = 1, limit = 10, search, status } = query
    const filter = { owner: userId }

    if (search) {
      filter.$or = [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    if (status) {
      filter.status = status
    }

    const campaigns = await Campaign.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await Campaign.countDocuments(filter)

    return {
      campaigns,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },

  async addContact(campaignId, contactId) {
    const campaign = await Campaign.findById(campaignId)
    if (!campaign) {
      throw new NotFoundError("Campaign not found")
    }
    if (!campaign.contacts.includes(contactId)) {
      campaign.contacts.push(contactId)
      await campaign.save()
    }
    return campaign
  },

  async removeContact(campaignId, contactId) {
    const campaign = await Campaign.findById(campaignId)
    if (!campaign) {
      throw new NotFoundError("Campaign not found")
    }
    campaign.contacts = campaign.contacts.filter((contact) => contact.toString() !== contactId)
    await campaign.save()
    return campaign
  },
}

