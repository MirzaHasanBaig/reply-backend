const amqp = require ("amqplib")
const { redisClient } = require ("../config/redis.js")
const { NotFoundError } = require ("../utils/errors.js")
const RABBITMQ_URL = process.env.RABBITMQ_URL

module.exports = VideoService = {
  async initiateVideoCall({ from, to }) {
    const connection = await amqp.connect(RABBITMQ_URL)
    const channel = await connection.createChannel()
    const queue = "video_call_queue"

    await channel.assertQueue(queue, { durable: true })
    const call = { from, to }
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(call)))

    const callId = await redisClient.incr("video_call_id_counter")
    await redisClient.set(`video_call:${callId}`, JSON.stringify({ status: "initiating", ...call }))

    await channel.close()
    await connection.close()

    return { callId, status: "initiating" }
  },

  async endVideoCall(callId) {
    const callData = await redisClient.get(`video_call:${callId}`)
    if (!callData) {
      throw new NotFoundError("Video call not found")
    }

    const call = JSON.parse(callData)
    call.status = "ended"
    await redisClient.set(`video_call:${callId}`, JSON.stringify(call))

    return { callId, status: "ended" }
  },

  async getVideoCallStatus(callId) {
    const callData = await redisClient.get(`video_call:${callId}`)
    if (!callData) {
      throw new NotFoundError("Video call not found")
    }
    return JSON.parse(callData)
  },
}

