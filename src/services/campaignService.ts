const { Campaign }  = require("../models/Campaign")
const { sendEmail }  = require("../utils/emailSender")
const { sendSMS }  = require("../utils/smsSender")
const { sendWhatsAppMessage }  = require("../utils/whatsappSender")
const { logger }  = require("../utils/logger")

export const createCampaign = async (userId, campaignData: any) => {
  try {
    const campaign = new Campaign({ ...campaignData, user: userId })
    await campaign.save()
    logger.info(`Campaign created: ${campaign.id}`)
    return campaign
  } catch (error) {
    logger.error(`Error creating campaign: ${error}`)
    throw error
  }
}

export const executeCampaign = async (campaignId) => {
  try {
    const campaign = await Campaign.findById(campaignId).populate("audience")
    if (!campaign) throw new Error("Campaign not found")

    for (const recipient of campaign.audience) {
      switch (campaign.type) {
        case "email":
          await sendEmail(recipient.email, campaign.subject, campaign.content)
          break
        case "sms":
          await sendSMS(recipient.phone, campaign.content)
          break
        case "whatsapp":
          await sendWhatsAppMessage(recipient.whatsapp, campaign.content)
          break
      }
    }

    campaign.status = "executed"
    await campaign.save()
    logger.info(`Campaign executed: ${campaignId}`)
  } catch (error) {
    logger.error(`Error executing campaign: ${error}`)
    throw error
  }
}

export const scheduleCampaign = async (campaignId, scheduledDate: Date) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(campaignId, { scheduledDate }, { new: true })
    if (!campaign) throw new Error("Campaign not found")
    logger.info(`Campaign scheduled: ${campaignId} for ${scheduledDate}`)
    return campaign
  } catch (error) {
    logger.error(`Error scheduling campaign: ${error}`)
    throw error
  }
}

export const getCampaignAnalytics = async (campaignId) => {
  try {
    const campaign = await Campaign.findById(campaignId)
    if (!campaign) throw new Error("Campaign not found")

    // Implement analytics calculation logic here
    const analytics = {
      sent: campaign.audience.length,
      delivered: 0,
      opened: 0,
      clicked: 0,
    }

    logger.info(`Campaign analytics retrieved: ${campaignId}`)
    return analytics
  } catch (error) {
    logger.error(`Error retrieving campaign analytics: ${error}`)
    throw error
  }
}

