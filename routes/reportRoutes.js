const express = require ("express")
const ReportController = require ("../controllers/reportController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

const router = express.Router()

/**
 * @swagger
 * /api/reports:
 *   post:
 *     summary: Generate a new report
 *     tags: [Reports]
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
 *               - dateRange
 *               - metrics
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [campaign_performance, sales_pipeline, team_activity, goal_progress, custom]
 *               dateRange:
 *                 type: object
 *                 properties:
 *                   start:
 *                     type: string
 *                     format: date
 *                   end:
 *                     type: string
 *                     format: date
 *               metrics:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Report generated successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, ReportController.generateReport)

/**
 * @swagger
 * /api/reports/{id}:
 *   get:
 *     summary: Get a report by ID
 *     tags: [Reports]
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
 *         description: Report retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Report not found
 */
router.get("/:id", authMiddleware, ReportController.getReport)

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: List reports
 *     tags: [Reports]
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
 *           enum: [campaign_performance, sales_pipeline, team_activity, goal_progress, custom]
 *     responses:
 *       200:
 *         description: List of reports retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, ReportController.listReports)

/**
 * @swagger
 * /api/reports/{id}:
 *   delete:
 *     summary: Delete a report
 *     tags: [Reports]
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
 *         description: Report deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Report not found
 */
router.delete("/:id", authMiddleware, ReportController.deleteReport)

/**
 * @swagger
 * /api/reports/{id}/schedule:
 *   post:
 *     summary: Schedule a report
 *     tags: [Reports]
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
 *               - frequency
 *               - recipients
 *             properties:
 *               frequency:
 *                 type: string
 *                 enum: [daily, weekly, monthly]
 *               recipients:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Report scheduled successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Report not found
 */
router.post("/:id/schedule", authMiddleware, ReportController.scheduleReport)

module.exports =  router

