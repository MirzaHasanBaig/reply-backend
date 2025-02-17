const express = require ("express")
const DealController = require ("../controllers/dealController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

const router = express.Router()

/**
 * @swagger
 * /api/deals:
 *   post:
 *     summary: Create a new deal
 *     tags: [Deals]
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
 *               - contact
 *               - stage
 *               - value
 *             properties:
 *               name:
 *                 type: string
 *               contact:
 *                 type: string
 *               stage:
 *                 type: string
 *               value:
 *                 type: number
 *               closeDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Deal created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, DealController.createDeal)

/**
 * @swagger
 * /api/deals/{id}:
 *   get:
 *     summary: Get a deal by ID
 *     tags: [Deals]
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
 *         description: Deal retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Deal not found
 */
router.get("/:id", authMiddleware, DealController.getDeal)

/**
 * @swagger
 * /api/deals/{id}:
 *   put:
 *     summary: Update a deal
 *     tags: [Deals]
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
 *               stage:
 *                 type: string
 *               value:
 *                 type: number
 *               closeDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Deal updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Deal not found
 */
router.put("/:id", authMiddleware, DealController.updateDeal)

/**
 * @swagger
 * /api/deals/{id}:
 *   delete:
 *     summary: Delete a deal
 *     tags: [Deals]
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
 *         description: Deal deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Deal not found
 */
router.delete("/:id", authMiddleware, DealController.deleteDeal)

/**
 * @swagger
 * /api/deals:
 *   get:
 *     summary: List deals
 *     tags: [Deals]
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
 *         name: stage
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [open, won, lost]
 *     responses:
 *       200:
 *         description: List of deals retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, DealController.listDeals)

/**
 * @swagger
 * /api/deals/{id}/stage:
 *   put:
 *     summary: Update deal stage
 *     tags: [Deals]
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
 *               - stage
 *             properties:
 *               stage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Deal stage updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Deal not found
 */
router.put("/:id/stage", authMiddleware, DealController.updateDealStage)

module.exports =  router

