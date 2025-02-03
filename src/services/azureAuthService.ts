const { ConfidentialClientApplication }  = require("@azure/msal-node")
const { logger }  = require("../utils/logger")

const config = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID ,
    authority: process.env.AZURE_AUTHORITY ,
    clientSecret: process.env.AZURE_CLIENT_SECRET ,
  },
}

const client = new ConfidentialClientApplication(config)

export const getAzureToken = async () => {
  try {
    const result = await client.acquireTokenByClientCredential({
      scopes: ["https://graph.microsoft.com/.default"],
    })
    logger.info("Azure token acquired")
    return result?.accessToken
  } catch (error) {
    logger.error(`Error acquiring Azure token: ${error}`)
    throw error
  }
}

