const ReportService = require ("../services/reportService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = ReportController = {
  async generateReport(req, res) {
    try {
      const report = await ReportService.generateReport(req.body, req.user.id)
      res.status(200).json(report)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getReport(req, res) {
    try {
      const report = await ReportService.getReport(req.params.id)
      res.status(200).json(report)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listReports(req, res) {
    try {
      const reports = await ReportService.listReports(req.user.id, req.query)
      res.status(200).json(reports)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteReport(req, res) {
    try {
      await ReportService.deleteReport(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async scheduleReport(req, res) {
    try {
      const scheduledReport = await ReportService.scheduleReport(req.params.id, req.body)
      res.status(200).json(scheduledReport)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

