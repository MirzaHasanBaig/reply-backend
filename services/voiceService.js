const amqp = require ("amqplib")
const { redisClient } = require ("../config/redis.js")
const { NotFoundError } = require ("../utils/errors.js")
const RABBITMQ_URL = process.env.RABBITMQ_URL

module.exports = VoiceService = {
  async initiateCall({ from, to }) {
    const connection = await amqp.connect(RABBITMQ_URL)
    const channel = await connection.createChannel()
    const queue = "voice_call_queue"

    await channel.assertQueue(queue, { durable: true })
    const call = { from, to }
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(call)))

    const callId = await redisClient.incr("call_id_counter")
    await redisClient.set(`call:${callId}`, JSON.stringify({ status: "initiating", ...call }))

    await channel.close()
    await connection.close()

    return { callId, status: "initiating" }
  },

  async endCall(callId) {
    const callData = await redisClient.get(`call:${callId}`)
    if (!callData) {
      throw new NotFoundError("Call not found")
    }

    const call = JSON.parse(callData)
    call.status = "ended"
    await redisClient.set(`call:${callId}`, JSON.stringify(call))

    return { callId, status: "ended" }
  },

  async getCallStatus(callId) {
    const callData = await redisClient.get(`call:${callId}`)
    if (!callData) {
      throw new NotFoundError("Call not found")
    }
    return JSON.parse(callData)
  },
}

