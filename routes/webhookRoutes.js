const express = require ("express")
const WebhookController = require ("../controllers/webhookController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")
const router = express.Router()

/**
 * @swagger
 * /api/webhooks:
 *   post:
 *     summary: Create a new webhook
 *     tags: [Webhooks]
 *     security:
 *       - authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - url
 *               - events
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *               events:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [message.sent, message.received, call.started, call.ended, contact.created, contact.updated]
 *     responses:
 *       201:
 *         description: Webhook created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, WebhookController.createWebhook)

/**
 * @swagger
 * /api/webhooks/{id}:
 *   get:
 *     summary: Get a webhook by ID
 *     tags: [Webhooks]
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Webhook retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Webhook not found
 */
router.get("/:id", authMiddleware, WebhookController.getWebhook)

/**
 * @swagger
 * /api/webhooks/{id}:
 *   put:
 *     summary: Update a webhook
 *     tags: [Webhooks]
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *               events:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [message.sent, message.received, call.started, call.ended, contact.created, contact.updated]
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Webhook updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Webhook not found
 */
router.put("/:id", authMiddleware, WebhookController.updateWebhook)

/**
 * @swagger
 * /api/webhooks/{id}:
 *   delete:
 *     summary: Delete a webhook
 *     tags: [Webhooks]
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Webhook deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Webhook not found
 */
router.delete("/:id", authMiddleware, WebhookController.deleteWebhook)

/**
 * @swagger
 * /api/webhooks:
 *   get:
 *     summary: List webhooks
 *     tags: [Webhooks]
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of webhooks retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, WebhookController.listWebhooks)

module.exports =  router

