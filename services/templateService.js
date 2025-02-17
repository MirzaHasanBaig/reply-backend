const Template = require ("../models/template.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = TemplateService = {
  async createTemplate(templateData, userId) {
    const template = new Template({
      ...templateData,
      owner: userId,
    })
    await template.save()
    return template
  },

  async getTemplate(templateId) {
    const template = await Template.findById(templateId)
    if (!template) {
      throw new NotFoundError("Template not found")
    }
    return template
  },

  async updateTemplate(templateId, updateData) {
    const template = await Template.findByIdAndUpdate(templateId, updateData, { new: true })
    if (!template) {
      throw new NotFoundError("Template not found")
    }
    return template
  },

  async deleteTemplate(templateId) {
    const result = await Template.findByIdAndDelete(templateId)
    if (!result) {
      throw new NotFoundError("Template not found")
    }
  },

  async listTemplates(userId, query) {
    const { page = 1, limit = 10, type, tags } = query
    const filter = { owner: userId }

    if (type) {
      filter.type = type
    }

    if (tags) {
      filter.tags = { $all: tags.split(",") }
    }

    const templates = await Template.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await Template.countDocuments(filter)

    return {
      templates,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },
}

