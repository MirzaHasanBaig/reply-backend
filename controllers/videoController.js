const VideoService = require ("../services/videoService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = VideoController = {
  async initiateVideoCall(req, res) {
    try {
      const result = await VideoService.initiateVideoCall(req.body)
      res.status(200).json(result)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async endVideoCall(req, res) {
    try {
      const result = await VideoService.endVideoCall(req.params.callId)
      res.status(200).json(result)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getVideoCallStatus(req, res) {
    try {
      const status = await VideoService.getVideoCallStatus(req.params.callId)
      res.status(200).json(status)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

