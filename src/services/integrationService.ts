const { Integration }  = require("../models/Integration")
const { logger }  = require("../utils/logger")

export const createIntegration = async (userId, integrationData: any) => {
  try {
    const integration = new Integration({ ...integrationData, user: userId })
    await integration.save()
    logger.info(`Integration created: ${integration.id}`)
    return integration
  } catch (error) {
    logger.error(`Error creating integration: ${error}`)
    throw error
  }
}

export const getIntegrationConfig = async (userId, integrationType) => {
  const integration = await Integration.findOne({ user: userId, type: integrationtype: String,isActive: true })
  if (!integration) {
    throw new Error(`No active ${integrationType} integration found for user`)
  }
  return integration.config
}

export const updateIntegration = async (integrationId, updateData: any) => {
  const integration = await Integration.findByIdAndUpdate(integrationId, updateData, { new: true })
  if (!integration) {
    throw new Error("Integration not found")
  }
  logger.info(`Integration updated: ${integrationId}`)
  return integration
}

export const deleteIntegration = async (integrationId) => {
  await Integration.findByIdAndDelete(integrationId)
  logger.info(`Integration deleted: ${integrationId}`)
}

