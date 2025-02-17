const Task = require ("../models/task.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = TaskService = {
  async createTask(taskData, userId) {
    const task = new Task({
      ...taskData,
      createdBy: userId,
    })
    await task.save()
    return task
  },

  async getTask(taskId) {
    const task = await Task.findById(taskId)
    if (!task) {
      throw new NotFoundError("Task not found")
    }
    return task
  },

  async updateTask(taskId, updateData) {
    const task = await Task.findByIdAndUpdate(taskId, updateData, { new: true })
    if (!task) {
      throw new NotFoundError("Task not found")
    }
    return task
  },

  async deleteTask(taskId) {
    const result = await Task.findByIdAndDelete(taskId)
    if (!result) {
      throw new NotFoundError("Task not found")
    }
  },

  async listTasks(userId, query) {
    const { page = 1, limit = 10, status, priority } = query
    const filter = { assignedTo: userId }

    if (status) {
      filter.status = status
    }

    if (priority) {
      filter.priority = priority
    }

    const tasks = await Task.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ dueDate: 1 })

    const total = await Task.countDocuments(filter)

    return {
      tasks,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },

  async completeTask(taskId) {
    const task = await Task.findById(taskId)
    if (!task) {
      throw new NotFoundError("Task not found")
    }
    task.status = "completed"
    task.completedAt = new Date()
    await task.save()
    return task
  },
}

