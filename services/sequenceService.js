const Sequence = require ("../models/sequence.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = SequenceService = {
  async createSequence(sequenceData, userId) {
    const sequence = new Sequence({
      ...sequenceData,
      owner: userId,
    })
    await sequence.save()
    return sequence
  },

  async getSequence(sequenceId) {
    const sequence = await Sequence.findById(sequenceId)
    if (!sequence) {
      throw new NotFoundError("Sequence not found")
    }
    return sequence
  },

  async updateSequence(sequenceId, updateData) {
    const sequence = await Sequence.findByIdAndUpdate(sequenceId, updateData, { new: true })
    if (!sequence) {
      throw new NotFoundError("Sequence not found")
    }
    return sequence
  },

  async deleteSequence(sequenceId) {
    const result = await Sequence.findByIdAndDelete(sequenceId)
    if (!result) {
      throw new NotFoundError("Sequence not found")
    }
  },

  async listSequences(userId, query) {
    const { page = 1, limit = 10, search, tags } = query
    const filter = { owner: userId }

    if (search) {
      filter.$or = [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    if (tags) {
      filter.tags = { $all: tags.split(",") }
    }

    const sequences = await Sequence.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await Sequence.countDocuments(filter)

    return {
      sequences,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },

  async addStep(sequenceId, stepData) {
    const sequence = await Sequence.findById(sequenceId)
    if (!sequence) {
      throw new NotFoundError("Sequence not found")
    }
    sequence.steps.push(stepData)
    await sequence.save()
    return sequence
  },

  async updateStep(sequenceId, stepId, updateData) {
    const sequence = await Sequence.findById(sequenceId)
    if (!sequence) {
      throw new NotFoundError("Sequence not found")
    }
    const stepIndex = sequence.steps.findIndex((step) => step._id.toString() === stepId)
    if (stepIndex === -1) {
      throw new NotFoundError("Step not found")
    }
    sequence.steps[stepIndex] = { ...sequence.steps[stepIndex], ...updateData }
    await sequence.save()
    return sequence
  },

  async removeStep(sequenceId, stepId) {
    const sequence = await Sequence.findById(sequenceId)
    if (!sequence) {
      throw new NotFoundError("Sequence not found")
    }
    sequence.steps = sequence.steps.filter((step) => step._id.toString() !== stepId)
    await sequence.save()
    return sequence
  },
}

