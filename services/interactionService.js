const Interaction = require ("../models/interaction.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = InteractionService = {
  async createInteraction(interactionData, userId) {
    const interaction = new Interaction({
      ...interactionData,
      user: userId,
    })
    await interaction.save()
    return interaction
  },

  async getInteraction(interactionId) {
    const interaction = await Interaction.findById(interactionId)
    if (!interaction) {
      throw new NotFoundError("Interaction not found")
    }
    return interaction
  },

  async updateInteraction(interactionId, updateData) {
    const interaction = await Interaction.findByIdAndUpdate(interactionId, updateData, { new: true })
    if (!interaction) {
      throw new NotFoundError("Interaction not found")
    }
    return interaction
  },

  async deleteInteraction(interactionId) {
    const result = await Interaction.findByIdAndDelete(interactionId)
    if (!result) {
      throw new NotFoundError("Interaction not found")
    }
  },

  async listInteractions(userId, query) {
    const { page = 1, limit = 10, type, status } = query
    const filter = { user: userId }

    if (type) {
      filter.type = type
    }

    if (status) {
      filter.status = status
    }

    const interactions = await Interaction.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await Interaction.countDocuments(filter)

    return {
      interactions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },
}

