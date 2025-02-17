const express = require ("express")
const MailboxController = require ("../controllers/mailboxController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

const router = express.Router()

/**
 * @swagger
 * /api/mailboxes:
 *   post:
 *     summary: Create a new mailbox
 *     tags: [Mailboxes]
 *     security:
 *       - authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - provider
 *               - credentials
 *             properties:
 *               email:
 *                 type: string
 *               provider:
 *                 type: string
 *                 enum: [gmail, outlook, other]
 *               credentials:
 *                 type: object
 *               dailySendLimit:
 *                 type: number
 *     responses:
 *       201:
 *         description: Mailbox created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, MailboxController.createMailbox)

/**
 * @swagger
 * /api/mailboxes/{id}:
 *   get:
 *     summary: Get a mailbox by ID
 *     tags: [Mailboxes]
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
 *         description: Mailbox retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Mailbox not found
 */
router.get("/:id", authMiddleware, MailboxController.getMailbox)

/**
 * @swagger
 * /api/mailboxes/{id}:
 *   put:
 *     summary: Update a mailbox
 *     tags: [Mailboxes]
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
 *               dailySendLimit:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *               settings:
 *                 type: object
 *     responses:
 *       200:
 *         description: Mailbox updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Mailbox not found
 */
router.put("/:id", authMiddleware, MailboxController.updateMailbox)

/**
 * @swagger
 * /api/mailboxes/{id}:
 *   delete:
 *     summary: Delete a mailbox
 *     tags: [Mailboxes]
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
 *         description: Mailbox deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Mailbox not found
 */
router.delete("/:id", authMiddleware, MailboxController.deleteMailbox)

/**
 * @swagger
 * /api/mailboxes:
 *   get:
 *     summary: List all mailboxes for the authenticated user
 *     tags: [Mailboxes]
 *     security:
 *       - authorization: []
 *     responses:
 *       200:
 *         description: List of mailboxes retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, MailboxController.listMailboxes)

/**
 * @swagger
 * /api/mailboxes/{id}/warmup-status:
 *   put:
 *     summary: Update mailbox warmup status
 *     tags: [Mailboxes]
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
 *               - status
 *               - progress
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [not_started, in_progress, completed]
 *               progress:
 *                 type: number
 *     responses:
 *       200:
 *         description: Mailbox warmup status updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Mailbox not found
 */
router.put("/:id/warmup-status", authMiddleware, MailboxController.updateWarmupStatus)

module.exports =  router

