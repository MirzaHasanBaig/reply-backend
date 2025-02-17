const Pipeline = require ("../models/pipeline.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = PipelineService = {
  async createPipeline(pipelineData, userId) {
    const pipeline = new Pipeline({
      ...pipelineData,
      owner: userId,
    })
    await pipeline.save()
    return pipeline
  },

  async getPipeline(pipelineId) {
    const pipeline = await Pipeline.findById(pipelineId)
    if (!pipeline) {
      throw new NotFoundError("Pipeline not found")
    }
    return pipeline
  },

  async updatePipeline(pipelineId, updateData) {
    const pipeline = await Pipeline.findByIdAndUpdate(pipelineId, updateData, { new: true })
    if (!pipeline) {
      throw new NotFoundError("Pipeline not found")
    }
    return pipeline
  },

  async deletePipeline(pipelineId) {
    const result = await Pipeline.findByIdAndDelete(pipelineId)
    if (!result) {
      throw new NotFoundError("Pipeline not found")
    }
  },

  async listPipelines(userId, query) {
    const { page = 1, limit = 10, isDefault } = query
    const filter = { owner: userId }

    if (isDefault !== undefined) {
      filter.isDefault = isDefault
    }

    const pipelines = await Pipeline.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await Pipeline.countDocuments(filter)

    return {
      pipelines,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },

  async addStage(pipelineId, stageData) {
    const pipeline = await Pipeline.findById(pipelineId)
    if (!pipeline) {
      throw new NotFoundError("Pipeline not found")
    }
    pipeline.stages.push(stageData)
    await pipeline.save()
    return pipeline
  },

  async removeStage(pipelineId, stageId) {
    const pipeline = await Pipeline.findById(pipelineId)
    if (!pipeline) {
      throw new NotFoundError("Pipeline not found")
    }
    pipeline.stages = pipeline.stages.filter((stage) => stage._id.toString() !== stageId)
    await pipeline.save()
    return pipeline
  },
}

