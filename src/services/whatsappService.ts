const twilio  = require("twilio")

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export const sendWhatsAppMessage = async (to, body) => {
  await client.messages.create({
    body,
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
    to: `whatsapp:${to}`,
  })
}

