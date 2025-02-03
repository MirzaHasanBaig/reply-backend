const Redis  = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)
const setupRedis = () => {
  redis.on("connect", () => {
    console.log("Redis connected")
  })
  redis.on("error", (error) => {
    console.error("Redis error:", error)
  })
}


module.exports = {redis,setupRedis}

