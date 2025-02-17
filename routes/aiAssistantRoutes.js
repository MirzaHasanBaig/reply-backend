const express = require ("express")
const AIAssistantController = require ("../controllers/aiAssistantController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

const router = express.Router()

/**
 * @swagger
 * /api/ai-assistants:
 *   post:
 *     summary: Create a new AI assistant
 *     tags: [AI Assistants]
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
 *               - model
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               model:
 *                 type: string
 *                 enum: [gpt-3.5-turbo, gpt-4, custom]
 *               customInstructions:
 *                 type: string
 *     responses:
 *       201:
 *         description: AI Assistant created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, AIAssistantController.createAssistant)

/**
 * @swagger
 * /api/ai-assistants/{id}:
 *   get:
 *     summary: Get an AI assistant by ID
 *     tags: [AI Assistants]
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
 *         description: AI Assistant retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: AI Assistant not found
 */
router.get("/:id", authMiddleware, AIAssistantController.getAssistant)

/**
 * @swagger
 * /api/ai-assistants/{id}:
 *   put:
 *     summary: Update an AI assistant
 *     tags: [AI Assistants]
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
 *               description:
 *                 type: string
 *               model:
 *                 type: string
 *                 enum: [gpt-3.5-turbo, gpt-4, custom]
 *               customInstructions:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI Assistant updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: AI Assistant not found
 */
router.put("/:id", authMiddleware, AIAssistantController.updateAssistant)

/**
 * @swagger
 * /api/ai-assistants/{id}:
 *   delete:
 *     summary: Delete an AI assistant
 *     tags: [AI Assistants]
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
 *         description: AI Assistant deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: AI Assistant not found
 */
router.delete("/:id", authMiddleware, AIAssistantController.deleteAssistant)

/**
 * @swagger
 * /api/ai-assistants:
 *   get:
 *     summary: List AI assistants
 *     tags: [AI Assistants]
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
 *         description: List of AI Assistants retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, AIAssistantController.listAssistants)

/**
 * @swagger
 * /api/ai-assistants/{id}/response:
 *   post:
 *     summary: Get a response from an AI assistant
 *     tags: [AI Assistants]
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
 *         description: AI Assistant response retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: AI Assistant not found
 */
router.post("/:id/response", authMiddleware, AIAssistantController.getAssistantResponse)

module.exports = router

