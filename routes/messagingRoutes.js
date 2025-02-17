const express = require ("express")
const MessagingController = require ("../controllers/messagingController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

const router = express.Router()

/**
 * @swagger
 * /api/messaging/sms:
 *   post:
 *     summary: Send an SMS
 *     tags: [Messaging]
 *     security:
 *       - authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - from
 *               - body
 *             properties:
 *               to:
 *                 type: string
 *               from:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: SMS sent successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/sms", authMiddleware, MessagingController.sendSMS)

/**
 * @swagger
 * /api/messaging/mms:
 *   post:
 *     summary: Send an MMS
 *     tags: [Messaging]
 *     security:
 *       - authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - from
 *               - body
 *               - mediaUrl
 *             properties:
 *               to:
 *                 type: string
 *               from:
 *                 type: string
 *               body:
 *                 type: string
 *               mediaUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: MMS sent successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/mms", authMiddleware, MessagingController.sendMMS)

/**
 * @swagger
 * /api/messaging/rcs:
 *   post:
 *     summary: Send an RCS message
 *     tags: [Messaging]
 *     security:
 *       - authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - from
 *               - body
 *               - suggestions
 *             properties:
 *               to:
 *                 type: string
 *               from:
 *                 type: string
 *               body:
 *                 type: string
 *               suggestions:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: RCS message sent successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/rcs", authMiddleware, MessagingController.sendRCS)

/**
 * @swagger
 * /api/messaging/status/{messageId}:
 *   get:
 *     summary: Get message status
 *     tags: [Messaging]
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message status retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Message not found
 */
router.get("/status/:messageId", authMiddleware, MessagingController.getMessageStatus)

module.exports =  router

