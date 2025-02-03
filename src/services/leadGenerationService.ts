const { Lead }  = require("../models/Lead")
const { Chatbot }  = require("../models/Chatbot")
const { Survey }  = require("../models/Survey")
const { enrichLeadData }  = require("./apolloService")
const { logger }  = require("../utils/logger")

export const captureLead = async (leadData: any) => {
  try {
    const lead = new Lead(leadData)
    await lead.save()
    logger.info(`Lead captured: ${lead.id}`)
    return lead
  } catch (error) {
    logger.error(`Error capturing lead: ${error}`)
    throw error
  }
}

export const enrichLead = async (leadId) => {
  try {
    const lead = await Lead.findById(leadId)
    if (!lead) throw new Error("Lead not found")

    const enrichedData = await enrichLeadData(lead.email)
    lead.enrichedData = enrichedData
    await lead.save()

    logger.info(`Lead enriched: ${leadId}`)
    return lead
  } catch (error) {
    logger.error(`Error enriching lead: ${error}`)
    throw error
  }
}

export const nurtureLead = async (leadId, nurturingAction: any) => {
  try {
    const lead = await Lead.findById(leadId)
    if (!lead) throw new Error("Lead not found")

    lead.nurturingActions.push(nurturingAction)
    await lead.save()
    logger.info(`Lead nurtured: ${leadId}`)
  } catch (error) {
    logger.error(`Error nurturing lead: ${error}`)
    throw error
  }
}

export const createChatbot = async (userId, chatbotData: any) => {
  try {
    const chatbot = new Chatbot({ ...chatbotData, user: userId })
    await chatbot.save()
    logger.info(`Chatbot created: ${chatbot.id}`)
    return chatbot
  } catch (error) {
    logger.error(`Error creating chatbot: ${error}`)
    throw error
  }
}

export const createSurvey = async (userId, surveyData: any) => {
  try {
    const survey = new Survey({ ...surveyData, user: userId })
    await survey.save()
    logger.info(`Survey created: ${survey.id}`)
    return survey
  } catch (error) {
    logger.error(`Error creating survey: ${error}`)
    throw error
  }
}

