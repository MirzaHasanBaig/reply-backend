const Workflow = require ("../models/workflow.js")
const { NotFoundError } = require ("../utils/errors.js")
const { executeAction } = require ("../utils/workflowActions.js")

module.exports = WorkflowService = {
  async createWorkflow(workflowData) {
    const workflow = new Workflow(workflowData)
    await workflow.save()
    return workflow
  },

  async getWorkflow(id) {
    const workflow = await Workflow.findById(id)
    if (!workflow) {
      throw new NotFoundError("Workflow not found")
    }
    return workflow
  },

  async updateWorkflow(id, updateData) {
    const workflow = await Workflow.findByIdAndUpdate(id, updateData, { new: true })
    if (!workflow) {
      throw new NotFoundError("Workflow not found")
    }
    return workflow
  },

  async deleteWorkflow(id) {
    const result = await Workflow.findByIdAndDelete(id)
    if (!result) {
      throw new NotFoundError("Workflow not found")
    }
  },

  async executeWorkflow(id, triggerData) {
    const workflow = await Workflow.findById(id)
    if (!workflow) {
      throw new NotFoundError("Workflow not found")
    }

    const results = []
    for (const action of workflow.actions) {
      const result = await executeAction(action, triggerData)
      results.push(result)
    }

    return { workflowId: id, results }
  },
}

