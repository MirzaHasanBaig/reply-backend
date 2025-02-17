const amqp = require ("amqplib")
const { redisClient } = require ("../config/redis.js")
const { NotFoundError } = require ("../utils/errors.js")
const RABBITMQ_URL = process.env.RABBITMQ_URL

module.exports = MessagingService = {
  async sendSMS({ to, from, body }) {
    const connection = await amqp.connect(RABBITMQ_URL)
    const channel = await connection.createChannel()
    const queue = "sms_queue"

    await channel.assertQueue(queue, { durable: true })
    const message = { to, from, body }
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))

    const messageId = await redisClient.incr("message_id_counter")
    await redisClient.set(`message:${messageId}`, JSON.stringify({ status: "queued", ...message }))

    await channel.close()
    await connection.close()

    return { messageId, status: "queued" }
  },

  async sendMMS({ to, from, body, mediaUrl }) {
    const connection = await amqp.connect(RABBITMQ_URL)
    const channel = await connection.createChannel()
    const queue = "mms_queue"

    await channel.assertQueue(queue, { durable: true })
    const message = { to, from, body, mediaUrl }
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))

    const messageId = await redisClient.incr("message_id_counter")
    await redisClient.set(`message:${messageId}`, JSON.stringify({ status: "queued", ...message }))

    await channel.close()
    await connection.close()

    return { messageId, status: "queued" }
  },

  async sendRCS({ to, from, body, suggestions }) {
    const connection = await amqp.connect(RABBITMQ_URL)
    const channel = await connection.createChannel()
    const queue = "rcs_queue"

    await channel.assertQueue(queue, { durable: true })
    const message = { to, from, body, suggestions }
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))

    const messageId = await redisClient.incr("message_id_counter")
    await redisClient.set(`message:${messageId}`, JSON.stringify({ status: "queued", ...message }))

    await channel.close()
    await connection.close()

    return { messageId, status: "queued" }
  },

  async getMessageStatus(messageId) {
    const messageData = await redisClient.get(`message:${messageId}`)
    if (!messageData) {
      throw new NotFoundError("Message not found")
    }
    return JSON.parse(messageData)
  },
}

