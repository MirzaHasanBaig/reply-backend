const { Automation }  = require("../models/Automation")
const { executeCampaign }  = require("./campaignService")
const { sendNotification }  = require("../utils/notificationSender")
const { triggerWebhook }  = require("../utils/webhookTrigger")
const { logger }  = require("../utils/logger")

export const createAutomation = async (userId, automationData: any) => {
  try {
    const automation = new Automation({ ...automationData, user: userId })
    await automation.save()
    logger.info(`Automation created: ${automation.id}`)
    return automation
  } catch (error) {
    logger.error(`Error creating automation: ${error}`)
    throw error
  }
}

export const triggerAutomation = async (automationId, triggerData: any) => {
  try {
    const automation = await Automation.findById(automationId)
    if (!automation) throw new Error("Automation not found")

    if (evaluateRules(automation.rules, triggerData)) {
      for (const action of automation.actions) {
        await executeAction(action, triggerData)
      }
      logger.info(`Automation triggered: ${automationId}`)
    }
  } catch (error) {
    logger.error(`Error triggering automation: ${error}`)
    throw error
  }
}

const evaluateRules = (rules: any[], data: any) => {
  return rules.every((rule) => {
    const { field, operator, value } = rule
    switch (operator) {
      case "equals":
        return data[field] === value
      case "contains":
        return data[field].includes(value)
      case "greaterThan":
        return data[field] > value
      case "lessThan":
        return data[field] < value
      default:
        return false
    }
  })
}

const executeAction = async (action: any, triggerData: any) => {
  switch (action.type) {
    case "campaign":
      await executeCampaign(action.campaignId)
      break
    case "notification":
      await sendNotification(action.userId, action.message)
      break
    case "webhook":
      await triggerWebhook(action.url, triggerData)
      break
    default:
      logger.warn(`Unknown action type: ${action.type}`)
  }
}

