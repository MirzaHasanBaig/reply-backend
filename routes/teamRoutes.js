const express = require ("express")
const TeamController = require ("../controllers/teamController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")
const router = express.Router()

/**
 * @swagger
 * /api/teams:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
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
 *     responses:
 *       201:
 *         description: Team created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, TeamController.createTeam)

/**
 * @swagger
 * /api/teams/{id}:
 *   get:
 *     summary: Get a team by ID
 *     tags: [Teams]
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
 *         description: Team retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Team not found
 */
router.get("/:id", authMiddleware, TeamController.getTeam)

/**
 * @swagger
 * /api/teams/{id}:
 *   put:
 *     summary: Update a team
 *     tags: [Teams]
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
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Team not found
 */
router.put("/:id", authMiddleware, TeamController.updateTeam)

/**
 * @swagger
 * /api/teams/{id}:
 *   delete:
 *     summary: Delete a team
 *     tags: [Teams]
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
 *         description: Team deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Team not found
 */
router.delete("/:id", authMiddleware, TeamController.deleteTeam)

/**
 * @swagger
 * /api/teams/{id}/members:
 *   post:
 *     summary: Add a member to a team
 *     tags: [Teams]
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
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member added successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Team not found
 */
router.post("/:id/members", authMiddleware, TeamController.addMember)

/**
 * @swagger
 * /api/teams/{id}/members/{userId}:
 *   delete:
 *     summary: Remove a member from a team
 *     tags: [Teams]
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Member removed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Team or member not found
 */
router.delete("/:id/members/:userId", authMiddleware, TeamController.removeMember)

/**
 * @swagger
 * /api/teams:
 *   get:
 *     summary: List all teams for the authenticated user
 *     tags: [Teams]
 *     security:
 *       - authorization: []
 *     responses:
 *       200:
 *         description: List of teams retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, TeamController.listTeams)

module.exports =  router

