const Trigger = require ("../models/trigger.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = TriggerService = {
  async createTrigger(triggerData, userId) {
    const trigger = new Trigger({
      ...triggerData,
      owner: userId,
    })
    await trigger.save()
    return trigger
  },

  async getTrigger(triggerId) {
    const trigger = await Trigger.findById(triggerId)
    if (!trigger) {
      throw new NotFoundError("Trigger not found")
    }
    return trigger
  },

  async updateTrigger(triggerId, updateData) {
    const trigger = await Trigger.findByIdAndUpdate(triggerId, updateData, { new: true })
    if (!trigger) {
      throw new NotFoundError("Trigger not found")
    }
    return trigger
  },

  async deleteTrigger(triggerId) {
    const result = await Trigger.findByIdAndDelete(triggerId)
    if (!result) {
      throw new NotFoundError("Trigger not found")
    }
  },

  async listTriggers(userId, query) {
    const { page = 1, limit = 10, event, isActive } = query
    const filter = { owner: userId }

    if (event) {
      filter.event = event
    }

    if (isActive !== undefined) {
      filter.isActive = isActive
    }

    const triggers = await Trigger.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await Trigger.countDocuments(filter)

    return {
      triggers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },

  async toggleTriggerStatus(triggerId) {
    const trigger = await Trigger.findById(triggerId)
    if (!trigger) {
      throw new NotFoundError("Trigger not found")
    }
    trigger.isActive = !trigger.isActive
    await trigger.save()
    return trigger
  },
}

