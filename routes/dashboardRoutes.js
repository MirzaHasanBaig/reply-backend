const express = require ("express")
const DashboardController = require ("../controllers/dashboardController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

const router = express.Router()

/**
 * @swagger
 * /api/dashboards:
 *   post:
 *     summary: Create a new dashboard
 *     tags: [Dashboards]
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
 *               layout:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [grid, freeform]
 *                   columns:
 *                     type: number
 *               isDefault:
 *                 type: boolean
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Dashboard created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, DashboardController.createDashboard)

/**
 * @swagger
 * /api/dashboards/{id}:
 *   get:
 *     summary: Get a dashboard by ID
 *     tags: [Dashboards]
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
 *         description: Dashboard retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Dashboard not found
 */
router.get("/:id", authMiddleware, DashboardController.getDashboard)

/**
 * @swagger
 * /api/dashboards/{id}:
 *   put:
 *     summary: Update a dashboard
 *     tags: [Dashboards]
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
 *               layout:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [grid, freeform]
 *                   columns:
 *                     type: number
 *               isDefault:
 *                 type: boolean
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dashboard updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Dashboard not found
 */
router.put("/:id", authMiddleware, DashboardController.updateDashboard)

/**
 * @swagger
 * /api/dashboards/{id}:
 *   delete:
 *     summary: Delete a dashboard
 *     tags: [Dashboards]
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
 *         description: Dashboard deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Dashboard not found
 */
router.delete("/:id", authMiddleware, DashboardController.deleteDashboard)

/**
 * @swagger
 * /api/dashboards:
 *   get:
 *     summary: List dashboards
 *     tags: [Dashboards]
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
 *         name: isDefault
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of dashboards retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, DashboardController.listDashboards)

/**
 * @swagger
 * /api/dashboards/{id}/widgets:
 *   post:
 *     summary: Add a widget to a dashboard
 *     tags: [Dashboards]
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
 *               - title
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [chart, metric, list, custom]
 *               title:
 *                 type: string
 *               dataSource:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [report, custom_query, api]
 *                   config:
 *                     type: object
 *               visualization:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [bar, line, pie, table, number, gauge]
 *                   config:
 *                     type: object
 *               position:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: number
 *                   y:
 *                     type: number
 *                   width:
 *                     type: number
 *                   height:
 *                     type: number
 *               refreshInterval:
 *                 type: number
 *     responses:
 *       200:
 *         description: Widget added successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Dashboard not found
 */
router.post("/:id/widgets", authMiddleware, DashboardController.addWidget)

/**
 * @swagger
 * /api/dashboards/{id}/widgets/{widgetId}:
 *   delete:
 *     summary: Remove a widget from a dashboard
 *     tags: [Dashboards]
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: widgetId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Widget removed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Dashboard or widget not found
 */
router.delete("/:id/widgets/:widgetId", authMiddleware, DashboardController.removeWidget)

module.exports =  router

