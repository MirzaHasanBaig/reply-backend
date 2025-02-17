const express = require ("express")
const TriggerController = require ("../controllers/triggerController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")
const router = express.Router()

/**
 * @swagger
 * /api/triggers:
 *   post:
 *     summary: Create a new trigger
 *     tags: [Triggers]
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
 *               - event
 *               - actions
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               event:
 *                 type: string
 *                 enum: [email_opened, email_clicked, form_submitted, deal_stage_changed, task_completed, contact_created, contact_updated, deal_created, deal_updated, meeting_scheduled]
 *               conditions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                     operator:
 *                       type: string
 *                       enum: [equals, not_equals, contains, greater_than, less_than, in, not_in]
 *                     value:
 *                       type: string
 *               actions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       enum: [send_email, create_task, update_contact, notify_user, add_to_sequence, update_deal, create_deal, send_slack_message, create_calendar_event]
 *                     config:
 *                       type: object
 *     responses:
 *       201:
 *         description: Trigger created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, TriggerController.createTrigger)

/**
 * @swagger
 * /api/triggers/{id}:
 *   get:
 *     summary: Get a trigger by ID
 *     tags: [Triggers]
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
 *         description: Trigger retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trigger not found
 */
router.get("/:id", authMiddleware, TriggerController.getTrigger)

/**
 * @swagger
 * /api/triggers/{id}:
 *   put:
 *     summary: Update a trigger
 *     tags: [Triggers]
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
 *               conditions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                     operator:
 *                       type: string
 *                       enum: [equals, not_equals, contains, greater_than, less_than, in, not_in]
 *                     value:
 *                       type: string
 *               actions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       enum: [send_email, create_task, update_contact, notify_user, add_to_sequence, update_deal, create_deal, send_slack_message, create_calendar_event]
 *                     config:
 *                       type: object
 *     responses:
 *       200:
 *         description: Trigger updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trigger not found
 */
router.put("/:id", authMiddleware, TriggerController.updateTrigger)

/**
 * @swagger
 * /api/triggers/{id}:
 *   delete:
 *     summary: Delete a trigger
 *     tags: [Triggers]
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
 *         description: Trigger deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trigger not found
 */
router.delete("/:id", authMiddleware, TriggerController.deleteTrigger)

/**
 * @swagger
 * /api/triggers:
 *   get:
 *     summary: List triggers
 *     tags: [Triggers]
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
 *         name: event
 *         schema:
 *           type: string
 *           enum: [email_opened, email_clicked, form_submitted, deal_stage_changed, task_completed, contact_created, contact_updated, deal_created, deal_updated, meeting_scheduled]
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of triggers retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, TriggerController.listTriggers)

/**
 * @swagger
 * /api/triggers/{id}/toggle:
 *   put:
 *     summary: Toggle trigger status
 *     tags: [Triggers]
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
 *         description: Trigger status toggled successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trigger not found
 */
router.put("/:id/toggle", authMiddleware, TriggerController.toggleTriggerStatus)

module.exports =  router

