const express = require ("express")
const AIChatController = require ("../controllers/aiChatController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

const router = express.Router()

/**
 * @swagger
 * /api/ai-chats:
 *   post:
 *     summary: Create a new AI chat
 *     tags: [AI Chats]
 *     security:
 *       - authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contact
 *             properties:
 *               contact:
 *                 type: string
 *               context:
 *                 type: string
 *               aiModel:
 *                 type: string
 *     responses:
 *       201:
 *         description: AI chat created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, AIChatController.createChat)

/**
 * @swagger
 * /api/ai-chats/{id}:
 *   get:
 *     summary: Get an AI chat by ID
 *     tags: [AI Chats]
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
 *         description: AI chat retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: AI chat not found
 */
router.get("/:id", authMiddleware, AIChatController.getChat)

/**
 * @swagger
 * /api/ai-chats/{id}/messages:
 *   post:
 *     summary: Send a message in an AI chat
 *     tags: [AI Chats]
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
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: AI chat not found
 */
router.post("/:id/messages", authMiddleware, AIChatController.sendMessage)

/**
 * @swagger
 * /api/ai-chats:
 *   get:
 *     summary: List AI chats
 *     tags: [AI Chats]
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
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, paused, completed]
 *     responses:
 *       200:
 *         description: List of AI chats retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, AIChatController.listChats)

/**
 * @swagger
 * /api/ai-chats/{id}/end:
 *   put:
 *     summary: End an AI chat
 *     tags: [AI Chats]
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
 *         description: AI chat ended successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: AI chat not found
 */
router.put("/:id/end", authMiddleware, AIChatController.endChat)

module.exports =  router

