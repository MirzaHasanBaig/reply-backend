const { createClient }  = require("redis")
const { v4 }  = require("uuid")
const { logger }  = require("./logger")
const uuidv4 = v4;
const redisClient = createClient({ url: process.env.REDIS_URL })

redisClient.on("error", (err) => logger.error("Redis Client Error", err))

export const createSession = async (userId) => {
  try {
    await redisClient.connect()
    const sessionId = uuidv4()
    await redisClient.set(`session:${sessionId}`, userId, { EX: 3600 }) // 1 hour expiration
    await redisClient.quit()
    return sessionId
  } catch (error) {
    logger.error(`Error creating session: ${error}`)
    throw error
  }
}

export const getSession = async (sessionId) => {
  try {
    await redisClient.connect()
    const userId = await redisClient.get(`session:${sessionId}`)
    await redisClient.quit()
    return userId
  } catch (error) {
    logger.error(`Error getting session: ${error}`)
    throw error
  }
}

export const deleteSession = async (sessionId) => {
  try {
    await redisClient.connect()
    await redisClient.del(`session:${sessionId}`)
    await redisClient.quit()
  } catch (error) {
    logger.error(`Error deleting session: ${error}`)
    throw error
  }
}

