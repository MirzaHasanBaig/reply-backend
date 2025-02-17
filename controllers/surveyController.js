const SurveyService = require ("../services/surveyService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = SurveyController = {
  async createSurvey(req, res) {
    try {
      const survey = await SurveyService.createSurvey(req.body, req.user.id)
      res.status(201).json(survey)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getSurvey(req, res) {
    try {
      const survey = await SurveyService.getSurvey(req.params.id)
      res.status(200).json(survey)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateSurvey(req, res) {
    try {
      const survey = await SurveyService.updateSurvey(req.params.id, req.body)
      res.status(200).json(survey)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteSurvey(req, res) {
    try {
      await SurveyService.deleteSurvey(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listSurveys(req, res) {
    try {
      const surveys = await SurveyService.listSurveys(req.user.id, req.query)
      res.status(200).json(surveys)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async submitResponse(req, res) {
    try {
      const response = await SurveyService.submitResponse(req.params.id, req.body)
      res.status(200).json(response)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getSurveyResults(req, res) {
    try {
      const results = await SurveyService.getSurveyResults(req.params.id)
      res.status(200).json(results)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

