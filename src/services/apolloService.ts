const axios  = require("axios")
const { logger }  = require("../utils/logger")

const apolloApiKey = process.env.APOLLO_API_KEY

export const extractLeadFromLinkedIn = async (linkedInUrl) => {
  try {
    const response = await axios.post("https://api.apollo.io/v1/people/match", {
      api_key: apolloApiKey,
      linkedin_url: linkedInUrl,
    })

    logger.info(`Lead extracted from LinkedIn: ${linkedInUrl}`)
    return response.data
  } catch (error) {
    logger.error(`Error extracting lead from LinkedIn: ${error}`)
    throw error
  }
}

export const enrichLeadData = async (email) => {
  try {
    const response = await axios.post("https://api.apollo.io/v1/people/match", {
      api_key: apolloApiKey,
      email,
    })

    logger.info(`Lead data enriched for email: ${email}`)
    return response.data
  } catch (error) {
    logger.error(`Error enriching lead data: ${error}`)
    throw error
  }
}

export const searchLeads = async (criteria: any) => {
  try {
    const response = await axios.post("https://api.apollo.io/v1/mixed_people/search", {
      api_key: apolloApiKey,
      ...criteria,
    })

    logger.info(`Leads searched with criteria: ${JSON.stringify(criteria)}`)
    return response.data
  } catch (error) {
    logger.error(`Error searching leads: ${error}`)
    throw error
  }
}

