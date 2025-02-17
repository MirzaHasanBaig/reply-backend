const Dashboard = require ("../models/dashboard.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = DashboardService = {
  async createDashboard(dashboardData, userId) {
    const dashboard = new Dashboard({
      ...dashboardData,
      owner: userId,
    })
    await dashboard.save()
    return dashboard
  },

  async getDashboard(dashboardId) {
    const dashboard = await Dashboard.findById(dashboardId)
    if (!dashboard) {
      throw new NotFoundError("Dashboard not found")
    }
    return dashboard
  },

  async updateDashboard(dashboardId, updateData) {
    const dashboard = await Dashboard.findByIdAndUpdate(dashboardId, updateData, { new: true })
    if (!dashboard) {
      throw new NotFoundError("Dashboard not found")
    }
    return dashboard
  },

  async deleteDashboard(dashboardId) {
    const result = await Dashboard.findByIdAndDelete(dashboardId)
    if (!result) {
      throw new NotFoundError("Dashboard not found")
    }
  },

  async listDashboards(userId, query) {
    const { page = 1, limit = 10, isDefault } = query
    const filter = { owner: userId }

    if (isDefault !== undefined) {
      filter.isDefault = isDefault
    }

    const dashboards = await Dashboard.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await Dashboard.countDocuments(filter)

    return {
      dashboards,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },

  async addWidget(dashboardId, widgetData) {
    const dashboard = await Dashboard.findById(dashboardId)
    if (!dashboard) {
      throw new NotFoundError("Dashboard not found")
    }
    dashboard.widgets.push(widgetData)
    await dashboard.save()
    return dashboard
  },

  async removeWidget(dashboardId, widgetId) {
    const dashboard = await Dashboard.findById(dashboardId)
    if (!dashboard) {
      throw new NotFoundError("Dashboard not found")
    }
    dashboard.widgets = dashboard.widgets.filter((widget) => widget._id.toString() !== widgetId)
    await dashboard.save()
    return dashboard
  },
}

