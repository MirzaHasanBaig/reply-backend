const express = require ("express")
const WorkflowController = require ("../controllers/workflowController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")
const router = express.Router()

/**
 * @swagger
 * /api/workflows:
 *   post:
 *     summary: Create a new workflow
 *     tags: [Workflows]
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
 *               - trigger
 *               - actions
 *             properties:
 *               name:
 *                 type: string
 *               trigger:
 *                 type: object
 *               actions:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       201:
 *         description: Workflow created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, WorkflowController.createWorkflow)

/**
 * @swagger
 * /api/workflows/{id}:
 *   get:
 *     summary: Get a workflow by ID
 *     tags: [Workflows]
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
 *         description: Workflow retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workflow not found
 */
router.get("/:id", authMiddleware, WorkflowController.getWorkflow)

/**
 * @swagger
 * /api/workflows/{id}:
 *   put:
 *     summary: Update a workflow
 *     tags: [Workflows]
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
 *               trigger:
 *                 type: object
 *               actions:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Workflow updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workflow not found
 */
router.put("/:id", authMiddleware, WorkflowController.updateWorkflow)

/**
 * @swagger
 * /api/workflows/{id}:
 *   delete:
 *     summary: Delete a workflow
 *     tags: [Workflows]
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
 *         description: Workflow deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workflow not found
 */
router.delete("/:id", authMiddleware, WorkflowController.deleteWorkflow)

/**
 * @swagger
 * /api/workflows/{id}/execute:
 *   post:
 *     summary: Execute a workflow
 *     tags: [Workflows]
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
 *     responses:
 *       200:
 *         description: Workflow executed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workflow not found
 */
router.post("/:id/execute", authMiddleware, WorkflowController.executeWorkflow)

module.exports =  router

