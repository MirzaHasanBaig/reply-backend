const express = require ("express")
const APIManagementController = require ("../controllers/apiManagementController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

const router = express.Router()

/**
 * @swagger
 * /api/api-management/keys:
 *   post:
 *     summary: Create a new API key
 *     tags: [API Management]
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
 *               - permissions
 *             properties:
 *               name:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [read, write, delete]
 *     responses:
 *       201:
 *         description: API key created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/keys", authMiddleware, APIManagementController.createAPIKey)

/**
 * @swagger
 * /api/api-management/keys/{id}:
 *   get:
 *     summary: Get an API key by ID
 *     tags: [API Management]
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
 *         description: API key retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: API key not found
 */
router.get("/keys/:id", authMiddleware, APIManagementController.getAPIKey)

/**
 * @swagger
 * /api/api-management/keys/{id}:
 *   put:
 *     summary: Update an API key
 *     tags: [API Management]
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
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [read, write, delete]
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: API key updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: API key not found
 */
router.put("/keys/:id", authMiddleware, APIManagementController.updateAPIKey)

/**
 * @swagger
 * /api/api-management/keys/{id}:
 *   delete:
 *     summary: Delete an API key
 *     tags: [API Management]
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
 *         description: API key deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: API key not found
 */
router.delete("/keys/:id", authMiddleware, APIManagementController.deleteAPIKey)

/**
 * @swagger
 * /api/api-management/keys:
 *   get:
 *     summary: List API keys
 *     tags: [API Management]
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
 *         description: List of API keys retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/keys", authMiddleware, APIManagementController.listAPIKeys)

module.exports =  router

