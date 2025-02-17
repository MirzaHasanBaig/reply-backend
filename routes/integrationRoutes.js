const express = require ("express")
const IntegrationController = require ("../controllers/integrationController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

const router = express.Router()

/**
 * @swagger
 * /api/integrations:
 *   post:
 *     summary: Create a new integration
 *     tags: [Integrations]
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
 *               - provider
 *               - config
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [crm, zapier, slack, calendar, voip, linkedin]
 *               provider:
 *                 type: string
 *               config:
 *                 type: object
 *     responses:
 *       201:
 *         description: Integration created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, IntegrationController.createIntegration)

/**
 * @swagger
 * /api/integrations/{id}:
 *   get:
 *     summary: Get an integration by ID
 *     tags: [Integrations]
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
 *         description: Integration retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Integration not found
 */
router.get("/:id", authMiddleware, IntegrationController.getIntegration)

/**
 * @swagger
 * /api/integrations/{id}:
 *   put:
 *     summary: Update an integration
 *     tags: [Integrations]
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
 *               config:
 *                 type: object
 *               status:
 *                 type: string
 *                 enum: [active, inactive, error]
 *     responses:
 *       200:
 *         description: Integration updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Integration not found
 */
router.put("/:id", authMiddleware, IntegrationController.updateIntegration)

/**
 * @swagger
 * /api/integrations/{id}:
 *   delete:
 *     summary: Delete an integration
 *     tags: [Integrations]
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
 *         description: Integration deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Integration not found
 */
router.delete("/:id", authMiddleware, IntegrationController.deleteIntegration)

/**
 * @swagger
 * /api/integrations:
 *   get:
 *     summary: List integrations
 *     tags: [Integrations]
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
 *           enum: [crm, zapier, slack, calendar, voip, linkedin]
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive, error]
 *     responses:
 *       200:
 *         description: List of integrations retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, IntegrationController.listIntegrations)

module.exports =  router

