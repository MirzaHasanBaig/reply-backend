const axios  = require("axios")
const { logger }  = require("./logger")

export const postToLinkedIn = async (accessToken, content) => {
  try {
    const response = await axios.post(
      "https://api.linkedin.com/v2/ugcPosts",
      {
        author: "urn:li:person:{PERSON_ID}",
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: content,
            },
            shareMediaCategory: "NONE",
          },
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    )

    logger.info(`Posted to LinkedIn: ${response.data.id}`)
    return response.data
  } catch (error) {
    logger.error(`Error posting to LinkedIn: ${error}`)
    throw error
  }
}

export const extractDataFromLinkedIn = async (profileUrl, apolloApiKey) => {
  try {
    const response = await axios.post("https://api.apollo.io/v1/people/match", {
      api_key: apolloApiKey,
      linkedin_url: profileUrl,
    })

    logger.info(`Extracted data from LinkedIn profile: ${profileUrl}`)
    return response.data
  } catch (error) {
    logger.error(`Error extracting data from LinkedIn: ${error}`)
    throw error
  }
}

