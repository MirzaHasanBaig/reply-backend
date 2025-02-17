const express = require ("express")
const ChatbotController = require ("../controllers/chatbotController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

const router = express.Router()

/**
 * @swagger
 * /api/chatbots:
 *   post:
 *     summary: Create a new chatbot
 *     tags: [Chatbots]
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
 *               - context
 *             properties:
 *               name:
 *                 type: string
 *               context:
 *                 type: string
 *     responses:
 *       201:
 *         description: Chatbot created successfully
 *       401:
 *         description: Unauthorized
 */ 
router.post("/", authMiddleware, ChatbotController.createChatbot)

/**
 * @swagger
 * /api/chatbots/{id}:
 *   get:
 *     summary: Get a chatbot by ID
 *     tags: [Chatbots]
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
 *         description: Chatbot retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chatbot not found
 */
router.get("/:id", authMiddleware, ChatbotController.getChatbot)

/**
 * @swagger
 * /api/chatbots/{id}:
 *   put:
 *     summary: Update a chatbot
 *     tags: [Chatbots]
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
 *               context:
 *                 type: string
 *     responses:
 *       200:
 *         description: Chatbot updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chatbot not found
 */
router.put("/:id", authMiddleware, ChatbotController.updateChatbot)

/**
 * @swagger
 * /api/chatbots/{id}:
 *   delete:
 *     summary: Delete a chatbot
 *     tags: [Chatbots]
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
 *         description: Chatbot deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chatbot not found
 */
router.delete("/:id", authMiddleware, ChatbotController.deleteChatbot)

/**
 * @swagger
 * /api/chatbots/{id}/message:
 *   post:
 *     summary: Send a message to the chatbot
 *     tags: [Chatbots]
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
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Chatbot response received successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chatbot not found
 */
router.post("/:id/message", authMiddleware, ChatbotController.sendMessage)

module.exports =  router

