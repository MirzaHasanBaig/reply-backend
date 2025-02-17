const express = require ("express")
const WebinarController = require ("../controllers/webinarController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")
const router = express.Router()

/**
 * @swagger
 * /api/webinars:
 *   post:
 *     summary: Create a new webinar
 *     tags: [Webinars]
 *     security:
 *       - authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - startDate
 *               - endDate
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               timezone:
 *                 type: string
 *               maxAttendees:
 *                 type: number
 *     responses:
 *       201:
 *         description: Webinar created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, WebinarController.createWebinar)

/**
 * @swagger
 * /api/webinars/{id}:
 *   get:
 *     summary: Get a webinar by ID
 *     tags: [Webinars]
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
 *         description: Webinar retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Webinar not found
 */
router.get("/:id", authMiddleware, WebinarController.getWebinar)

/**
 * @swagger
 * /api/webinars/{id}:
 *   put:
 *     summary: Update a webinar
 *     tags: [Webinars]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               timezone:
 *                 type: string
 *               maxAttendees:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [scheduled, live, completed, cancelled]
 *     responses:
 *       200:
 *         description: Webinar updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Webinar not found
 */
router.put("/:id", authMiddleware, WebinarController.updateWebinar)

/**
 * @swagger
 * /api/webinars/{id}:
 *   delete:
 *     summary: Delete a webinar
 *     tags: [Webinars]
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
 *         description: Webinar deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Webinar not found
 */
router.delete("/:id", authMiddleware, WebinarController.deleteWebinar)

/**
 * @swagger
 * /api/webinars:
 *   get:
 *     summary: List webinars
 *     tags: [Webinars]
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
 *         name: status
 *         schema:
 *           type: string
 *           enum: [scheduled, live, completed, cancelled]
 *     responses:
 *       200:
 *         description: List of webinars retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, WebinarController.listWebinars)

/**
 * @swagger
 * /api/webinars/{id}/register:
 *   post:
 *     summary: Register an attendee for a webinar
 *     tags: [Webinars]
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
 *               - attendeeId
 *             properties:
 *               attendeeId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Attendee registered successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Webinar not found
 */
router.post("/:id/register", authMiddleware, WebinarController.registerAttendee)

/**
 * @swagger
 * /api/webinars/{id}/start:
 *   put:
 *     summary: Start a webinar
 *     tags: [Webinars]
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
 *         description: Webinar started successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Webinar not found
 */
router.put("/:id/start", authMiddleware, WebinarController.startWebinar)

/**
 * @swagger
 * /api/webinars/{id}/end:
 *   put:
 *     summary: End a webinar
 *     tags: [Webinars]
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
 *         description: Webinar ended successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Webinar not found
 */
router.put("/:id/end", authMiddleware, WebinarController.endWebinar)

module.exports =  router

