const { GoogleAdsApi }  = require("google-ads-api")
const { logger }  = require("../utils/logger")

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID ,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET ,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN ,
})

export const getCampaigns = async (customerId) => {
  try {
    const customer = client.Customer({
      customer_id: customerId,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN ,
    })

    const campaigns = await customer.report({
      entity: "campaign",
      attributes: ["campaign.id", "campaign.name", "campaign.status"],
      metrics: ["metrics.impressions", "metrics.clicks", "metrics.cost_micros"],
      constraints: {
        "campaign.status": "ENABLED",
      },
    })

    logger.info(`Retrieved campaigns for customer: ${customerId}`)
    return campaigns
  } catch (error) {
    logger.error(`Error retrieving Google Ads campaigns: ${error}`)
    throw error
  }
}

