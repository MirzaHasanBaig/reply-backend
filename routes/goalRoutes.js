const express = require ("express")
const GoalController = require ("../controllers/goalController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

const router = express.Router()

/**
 * @swagger
 * /api/goals:
 *   post:
 *     summary: Create a new goal
 *     tags: [Goals]
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
 *               - type
 *               - target
 *               - startDate
 *               - endDate
 *               - frequency
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [revenue, deals_closed, meetings_booked, emails_sent, custom]
 *               target:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               frequency:
 *                 type: string
 *                 enum: [daily, weekly, monthly, quarterly, yearly]
 *     responses:
 *       201:
 *         description: Goal created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, GoalController.createGoal)

/**
 * @swagger
 * /api/goals/{id}:
 *   get:
 *     summary: Get a goal by ID
 *     tags: [Goals]
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
 *         description: Goal retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Goal not found
 */
router.get("/:id", authMiddleware, GoalController.getGoal)

/**
 * @swagger
 * /api/goals/{id}:
 *   put:
 *     summary: Update a goal
 *     tags: [Goals]
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
 *               target:
 *                 type: number
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Goal updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Goal not found
 */
router.put("/:id", authMiddleware, GoalController.updateGoal)

/**
 * @swagger
 * /api/goals/{id}:
 *   delete:
 *     summary: Delete a goal
 *     tags: [Goals]
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
 *         description: Goal deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Goal not found
 */
router.delete("/:id", authMiddleware, GoalController.deleteGoal)

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: List goals
 *     tags: [Goals]
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
 *           enum: [revenue, deals_closed, meetings_booked, emails_sent, custom]
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [not_started, in_progress, completed, failed]
 *     responses:
 *       200:
 *         description: List of goals retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, GoalController.listGoals)

/**
 * @swagger
 * /api/goals/{id}/progress:
 *   put:
 *     summary: Update goal progress
 *     tags: [Goals]
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
 *               - progress
 *             properties:
 *               progress:
 *                 type: number
 *     responses:
 *       200:
 *         description: Goal progress updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Goal not found
 */
router.put("/:id/progress", authMiddleware, GoalController.updateGoalProgress)

module.exports =  router

