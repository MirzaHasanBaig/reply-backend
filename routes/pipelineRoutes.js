const express = require ("express")
const PipelineController = require ("../controllers/pipelineController.js")
const authMiddleware = require ("../middleware/authMiddleware.js")

const router = express.Router()

/**
 * @swagger
 * /api/pipelines:
 *   post:
 *     summary: Create a new pipeline
 *     tags: [Pipelines]
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
 *               - stages
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               stages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     order:
 *                       type: number
 *                     probability:
 *                       type: number
 *                     expectedDuration:
 *                       type: number
 *               isDefault:
 *                 type: boolean
 *               dealTypes:
 *                 type: array
 *                 items:
 *                   type: string
 *               currency:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pipeline created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, PipelineController.createPipeline)

/**
 * @swagger
 * /api/pipelines/{id}:
 *   get:
 *     summary: Get a pipeline by ID
 *     tags: [Pipelines]
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
 *         description: Pipeline retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pipeline not found
 */
router.get("/:id", authMiddleware, PipelineController.getPipeline)

/**
 * @swagger
 * /api/pipelines/{id}:
 *   put:
 *     summary: Update a pipeline
 *     tags: [Pipelines]
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
 *               stages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     order:
 *                       type: number
 *                     probability:
 *                       type: number
 *                     expectedDuration:
 *                       type: number
 *               isDefault:
 *                 type: boolean
 *               dealTypes:
 *                 type: array
 *                 items:
 *                   type: string
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pipeline updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pipeline not found
 */
router.put("/:id", authMiddleware, PipelineController.updatePipeline)

/**
 * @swagger
 * /api/pipelines/{id}:
 *   delete:
 *     summary: Delete a pipeline
 *     tags: [Pipelines]
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
 *         description: Pipeline deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pipeline not found
 */
router.delete("/:id", authMiddleware, PipelineController.deletePipeline)

/**
 * @swagger
 * /api/pipelines:
 *   get:
 *     summary: List pipelines
 *     tags: [Pipelines]
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
 *         description: List of pipelines retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, PipelineController.listPipelines)

/**
 * @swagger
 * /api/pipelines/{id}/stages:
 *   post:
 *     summary: Add a stage to a pipeline
 *     tags: [Pipelines]
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
 *               - name
 *               - order
 *             properties:
 *               name:
 *                 type: string
 *               order:
 *                 type: number
 *               probability:
 *                 type: number
 *               expectedDuration:
 *                 type: number
 *     responses:
 *       200:
 *         description: Stage added successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pipeline not found
 */
router.post("/:id/stages", authMiddleware, PipelineController.addStage)

/**
 * @swagger
 * /api/pipelines/{id}/stages/{stageId}:
 *   delete:
 *     summary: Remove a stage from a pipeline
 *     tags: [Pipelines]
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: stageId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stage removed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pipeline or stage not found
 */
router.delete("/:id/stages/:stageId", authMiddleware, PipelineController.removeStage)

module.exports =  router

