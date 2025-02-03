const axios  = require("axios")

const apolloApiKey = process.env.APOLLO_API_KEY

export const extractEmailFromLinkedIn = async (linkedInUrl) => {
  try {
    const response = await axios.post("https://api.apollo.io/v1/people/match", {
      api_key: apolloApiKey,
      linkedin_url: linkedInUrl,
    })

    return response.data.email
  } catch (error) {
    console.error("Error extracting email from LinkedIn:", error)
    return null
  }
}

