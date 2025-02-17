const Deal = require ("../models/deal.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = DealService = {
  async createDeal(dealData, userId) {
    const deal = new Deal({
      ...dealData,
      owner: userId,
    })
    await deal.save()
    return deal
  },

  async getDeal(dealId) {
    const deal = await Deal.findById(dealId)
    if (!deal) {
      throw new NotFoundError("Deal not found")
    }
    return deal
  },

  async updateDeal(dealId, updateData) {
    const deal = await Deal.findByIdAndUpdate(dealId, updateData, { new: true })
    if (!deal) {
      throw new NotFoundError("Deal not found")
    }
    return deal
  },

  async deleteDeal(dealId) {
    const result = await Deal.findByIdAndDelete(dealId)
    if (!result) {
      throw new NotFoundError("Deal not found")
    }
  },

  async listDeals(userId, query) {
    const { page = 1, limit = 10, stage, status } = query
    const filter = { owner: userId }

    if (stage) {
      filter.stage = stage
    }

    if (status) {
      filter.status = status
    }

    const deals = await Deal.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await Deal.countDocuments(filter)

    return {
      deals,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },

  async updateDealStage(dealId, stage) {
    const deal = await Deal.findById(dealId)
    if (!deal) {
      throw new NotFoundError("Deal not found")
    }
    deal.stage = stage
    await deal.save()
    return deal
  },
}

