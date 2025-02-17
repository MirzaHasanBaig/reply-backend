const Report = require ("../models/report.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = ReportService = {
  async generateReport(reportData, userId) {
    const report = new Report({
      ...reportData,
      owner: userId,
    })
    await report.save()
    return report
  },

  async getReport(reportId) {
    const report = await Report.findById(reportId)
    if (!report) {
      throw new NotFoundError("Report not found")
    }
    return report
  },

  async listReports(userId, query) {
    const { page = 1, limit = 10, type } = query
    const filter = { owner: userId }

    if (type) {
      filter.type = type
    }

    const reports = await Report.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await Report.countDocuments(filter)

    return {
      reports,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },

  async deleteReport(reportId) {
    const result = await Report.findByIdAndDelete(reportId)
    if (!result) {
      throw new NotFoundError("Report not found")
    }
  },

  async scheduleReport(reportId, scheduleData) {
    const report = await Report.findById(reportId)
    if (!report) {
      throw new NotFoundError("Report not found")
    }
    report.schedule = scheduleData
    await report.save()
    return report
  },
}

