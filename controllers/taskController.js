const TaskService = require ("../services/taskService.js")
const { errorHandler } = require ("../utils/errorHandler.js")
module.exports = TaskController = {
  async createTask(req, res) {
    try {
      const task = await TaskService.createTask(req.body, req.user.id)
      res.status(201).json(task)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getTask(req, res) {
    try {
      const task = await TaskService.getTask(req.params.id)
      res.status(200).json(task)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateTask(req, res) {
    try {
      const task = await TaskService.updateTask(req.params.id, req.body)
      res.status(200).json(task)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteTask(req, res) {
    try {
      await TaskService.deleteTask(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listTasks(req, res) {
    try {
      const tasks = await TaskService.listTasks(req.user.id, req.query)
      res.status(200).json(tasks)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async completeTask(req, res) {
    try {
      const task = await TaskService.completeTask(req.params.id)
      res.status(200).json(task)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

