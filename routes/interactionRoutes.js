const express = require ("express")
const InteractionController = require ("../controllers/interactionController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

const router = express.Router()

/**
 * @swagger
 * /api/interactions:
 *   post:
 *     summary: Create a new interaction
 *     tags: [Interactions]
 *     security:
 *       - authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - contact
 *               - status
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [email, call, linkedin, sms, whatsapp, meeting]
 *               contact:
 *                 type: string
 *               campaign:
 *                 type: string
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [scheduled, sent, opened, clicked, replied, completed, failed]
 *     responses:
 *       201:
 *         description: Interaction created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, InteractionController.createInteraction)

/**
 * @swagger
 * /api/interactions/{id}:
 *   get:
 *     summary: Get an interaction by ID
 *     tags: [Interactions]
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
 *         description: Interaction retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Interaction not found
 */
router.get("/:id", authMiddleware, InteractionController.getInteraction)

/**
 * @swagger
 * /api/interactions/{id}:
 *   put:
 *     summary: Update an interaction
 *     tags: [Interactions]
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
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [scheduled, sent, opened, clicked, replied, completed, failed]
 *     responses:
 *       200:
 *         description: Interaction updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Interaction not found
 */
router.put("/:id", authMiddleware, InteractionController.updateInteraction)

/**
 * @swagger
 * /api/interactions/{id}:
 *   delete:
 *     summary: Delete an interaction
 *     tags: [Interactions]
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
 *         description: Interaction deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Interaction not found
 */
router.delete("/:id", authMiddleware, InteractionController.deleteInteraction)

/**
 * @swagger
 * /api/interactions:
 *   get:
 *     summary: List interactions
 *     tags: [Interactions]
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
 *         name: type
 *         schema:
 *           type: string
 *           enum: [email, call, linkedin, sms, whatsapp, meeting]
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [scheduled, sent, opened, clicked, replied, completed, failed]
 *     responses:
 *       200:
 *         description: List of interactions retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, InteractionController.listInteractions)

module.exports =  router

