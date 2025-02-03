const { OpenAI }  = require("openai")
const { logger }  = require("../utils/logger")

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const generateEmailContent = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant that generates email content." },
        { role: "user", content: prompt },
      ],
    })

    logger.info("Email content generated")
    return response.choices[0].message.content
  } catch (error) {
    logger.error(`Error generating email content: ${error}`)
    throw error
  }
}

export const generateSocialMediaPost = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant that generates social media posts." },
        { role: "user", content: prompt },
      ],
    })

    logger.info("Social media post generated")
    return response.choices[0].message.content
  } catch (error) {
    logger.error(`Error generating social media post: ${error}`)
    throw error
  }
}

export const generateProductDescription = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant that generates product descriptions." },
        { role: "user", content: prompt },
      ],
    })

    logger.info("Product description generated")
    return response.choices[0].message.content
  } catch (error) {
    logger.error(`Error generating product description: ${error}`)
    throw error
  }
}

