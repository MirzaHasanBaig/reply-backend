const express = require ("express")
const SequenceController = require ("../controllers/sequenceController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

const router = express.Router()

/**
 * @swagger
 * /api/sequences:
 *   post:
 *     summary: Create a new sequence
 *     tags: [Sequences]
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
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Sequence created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, SequenceController.createSequence)

/**
 * @swagger
 * /api/sequences/{id}:
 *   get:
 *     summary: Get a sequence by ID
 *     tags: [Sequences]
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
 *         description: Sequence retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Sequence not found
 */
router.get("/:id", authMiddleware, SequenceController.getSequence)

/**
 * @swagger
 * /api/sequences/{id}:
 *   put:
 *     summary: Update a sequence
 *     tags: [Sequences]
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
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Sequence updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Sequence not found
 */
router.put("/:id", authMiddleware, SequenceController.updateSequence)

/**
 * @swagger
 * /api/sequences/{id}:
 *   delete:
 *     summary: Delete a sequence
 *     tags: [Sequences]
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
 *         description: Sequence deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Sequence not found
 */
router.delete("/:id", authMiddleware, SequenceController.deleteSequence)

/**
 * @swagger
 * /api/sequences:
 *   get:
 *     summary: List sequences
 *     tags: [Sequences]
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
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of sequences retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, SequenceController.listSequences)

/**
 * @swagger
 * /api/sequences/{id}/steps:
 *   post:
 *     summary: Add a step to a sequence
 *     tags: [Sequences]
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
 *               - type
 *               - content
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [email, call, linkedin, sms, whatsapp, task]
 *               content:
 *                 type: string
 *               delay:
 *                 type: number
 *     responses:
 *       200:
 *         description: Step added successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Sequence not found
 */
router.post("/:id/steps", authMiddleware, SequenceController.addStep)

/**
 * @swagger
 * /api/sequences/{id}/steps/{stepId}:
 *   put:
 *     summary: Update a step in a sequence
 *     tags: [Sequences]
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: stepId
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
 *               type:
 *                 type: string
 *                 enum: [email, call, linkedin, sms, whatsapp, task]
 *               content:
 *                 type: string
 *               delay:
 *                 type: number
 *     responses:
 *       200:
 *         description: Step updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Sequence or step not found
 */
router.put("/:id/steps/:stepId", authMiddleware, SequenceController.updateStep)

/**
 * @swagger
 * /api/sequences/{id}/steps/{stepId}:
 *   delete:
 *     summary: Remove a step from a sequence
 *     tags: [Sequences]
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: stepId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Step removed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Sequence or step not found
 */
router.delete("/:id/steps/:stepId", authMiddleware, SequenceController.removeStep)

module.exports =  router

