const TeamService = require ("../services/teamService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = TeamController = {
  async createTeam(req, res) {
    try {
      const team = await TeamService.createTeam(req.body, req.user.id)
      res.status(201).json(team)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getTeam(req, res) {
    try {
      const team = await TeamService.getTeam(req.params.id)
      res.status(200).json(team)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateTeam(req, res) {
    try {
      const team = await TeamService.updateTeam(req.params.id, req.body)
      res.status(200).json(team)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteTeam(req, res) {
    try {
      await TeamService.deleteTeam(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async addMember(req, res) {
    try {
      const team = await TeamService.addMember(req.params.id, req.body.userId)
      res.status(200).json(team)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async removeMember(req, res) {
    try {
      const team = await TeamService.removeMember(req.params.id, req.params.userId)
      res.status(200).json(team)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listTeams(req, res) {
    try {
      const teams = await TeamService.listTeams(req.user.id)
      res.status(200).json(teams)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

