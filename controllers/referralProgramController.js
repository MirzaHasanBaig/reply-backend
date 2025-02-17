const ReferralProgramService = require ("../services/referralProgramService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = ReferralProgramController = {
  async createProgram(req, res) {
    try {
      const program = await ReferralProgramService.createProgram(req.body, req.user.id)
      res.status(201).json(program)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getProgram(req, res) {
    try {
      const program = await ReferralProgramService.getProgram(req.params.id)
      res.status(200).json(program)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateProgram(req, res) {
    try {
      const program = await ReferralProgramService.updateProgram(req.params.id, req.body)
      res.status(200).json(program)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteProgram(req, res) {
    try {
      await ReferralProgramService.deleteProgram(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listPrograms(req, res) {
    try {
      const programs = await ReferralProgramService.listPrograms(req.user.id, req.query)
      res.status(200).json(programs)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async generateReferralCode(req, res) {
    try {
      const code = await ReferralProgramService.generateReferralCode(req.params.id, req.user.id)
      res.status(200).json({ code })
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async trackReferral(req, res) {
    try {
      const referral = await ReferralProgramService.trackReferral(req.body)
      res.status(200).json(referral)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getReferralStats(req, res) {
    try {
      const stats = await ReferralProgramService.getReferralStats(req.params.id)
      res.status(200).json(stats)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

