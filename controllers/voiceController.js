const VoiceService = require ("../services/voiceService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = VoiceController = {
  async initiateCall(req, res) {
    try {
      const result = await VoiceService.initiateCall(req.body)
      res.status(200).json(result)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async endCall(req, res) {
    try {
      const result = await VoiceService.endCall(req.params.callId)
      res.status(200).json(result)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getCallStatus(req, res) {
    try {
      const status = await VoiceService.getCallStatus(req.params.callId)
      res.status(200).json(status)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

