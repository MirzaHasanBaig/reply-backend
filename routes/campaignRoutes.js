const express = require ("express")
const CampaignController = require ("../controllers/campaignController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

const router = express.Router()

/**
 * @swagger
 * /api/campaigns:
 *   post: 
 *     summary: Create a new campaign
 *     tags: [Campaigns]
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
 *               - sequence
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               sequence:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [draft, active, paused, completed]
 *     responses:
 *       201:
 *         description: Campaign created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, CampaignController.createCampaign)

/**
 * @swagger
 * /api/campaigns/{id}:
 *   get:
 *     summary: Get a campaign by ID
 *     tags: [Campaigns]
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
 *         description: Campaign retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Campaign not found
 */
router.get("/:id", authMiddleware, CampaignController.getCampaign)

/**
 * @swagger
 * /api/campaigns/{id}:
 *   put:
 *     summary: Update a campaign
 *     tags: [Campaigns]
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
 *               status:
 *                 type: string
 *                 enum: [draft, active, paused, completed]
 *     responses:
 *       200:
 *         description: Campaign updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Campaign not found
 */
router.put("/:id", authMiddleware, CampaignController.updateCampaign)

/**
 * @swagger
 * /api/campaigns/{id}:
 *   delete:
 *     summary: Delete a campaign
 *     tags: [Campaigns]
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
 *         description: Campaign deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Campaign not found
 */
router.delete("/:id", authMiddleware, CampaignController.deleteCampaign)

/**
 * @swagger
 * /api/campaigns:
 *   get:
 *     summary: List campaigns
 *     tags: [Campaigns]
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
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, active, paused, completed]
 *     responses:
 *       200:
 *         description: List of campaigns retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, CampaignController.listCampaigns)

/**
 * @swagger
 * /api/campaigns/{id}/contacts:
 *   post:
 *     summary: Add a contact to a campaign
 *     tags: [Campaigns]
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
 *               - contactId
 *             properties:
 *               contactId:
 *                 type: string
 */

module.exports = router;