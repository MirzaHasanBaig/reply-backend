const DashboardService = require ("../services/dashboardService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = DashboardController = {
  async createDashboard(req, res) {
    try {
      const dashboard = await DashboardService.createDashboard(req.body, req.user.id)
      res.status(201).json(dashboard)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getDashboard(req, res) {
    try {
      const dashboard = await DashboardService.getDashboard(req.params.id)
      res.status(200).json(dashboard)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateDashboard(req, res) {
    try {
      const dashboard = await DashboardService.updateDashboard(req.params.id, req.body)
      res.status(200).json(dashboard)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteDashboard(req, res) {
    try {
      await DashboardService.deleteDashboard(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listDashboards(req, res) {
    try {
      const dashboards = await DashboardService.listDashboards(req.user.id, req.query)
      res.status(200).json(dashboards)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async addWidget(req, res) {
    try {
      const dashboard = await DashboardService.addWidget(req.params.id, req.body)
      res.status(200).json(dashboard)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async removeWidget(req, res) {
    try {
      const dashboard = await DashboardService.removeWidget(req.params.id, req.params.widgetId)
      res.status(200).json(dashboard)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

