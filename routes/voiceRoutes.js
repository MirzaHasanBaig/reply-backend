const express = require ("express")
const VoiceController = require ("../controllers/voiceController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")
const router = express.Router()

/**
 * @swagger
 * /api/voice/call:
 *   post:
 *     summary: Initiate a voice call
 *     tags: [Voice]
 *     security:
 *       - authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from
 *               - to
 *             properties:
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *     responses:
 *       200:
 *         description: Call initiated successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/call", authMiddleware, VoiceController.initiateCall)

/**
 * @swagger
 * /api/voice/call/{callId}:
 *   delete:
 *     summary: End a voice call
 *     tags: [Voice]
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: callId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Call ended successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Call not found
 */
router.delete("/call/:callId", authMiddleware, VoiceController.endCall)

/**
 * @swagger
 * /api/voice/call/{callId}/status:
 *   get:
 *     summary: Get call status
 *     tags: [Voice]
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: callId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Call status retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Call not found
 */
router.get("/call/:callId/status", authMiddleware, VoiceController.getCallStatus)

module.exports =  router

