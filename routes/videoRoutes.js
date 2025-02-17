const express = require ("express")
const VideoController = require ("../controllers/videoController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")
const router = express.Router()

/**
 * @swagger
 * /api/video/call:
 *   post:
 *     summary: Initiate a video call
 *     tags: [Video]
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
 *         description: Video call initiated successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/call", authMiddleware, VideoController.initiateVideoCall)

/**
 * @swagger
 * /api/video/call/{callId}:
 *   delete:
 *     summary: End a video call
 *     tags: [Video]
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
 *         description: Video call ended successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Video call not found
 */
router.delete("/call/:callId", authMiddleware, VideoController.endVideoCall)

/**
 * @swagger
 * /api/video/call/{callId}/status:
 *   get:
 *     summary: Get video call status
 *     tags: [Video]
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
 *         description: Video call status retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Video call not found
 */
router.get("/call/:callId/status", authMiddleware, VideoController.getVideoCallStatus)

module.exports =  router

