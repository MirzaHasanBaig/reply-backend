const AWS  = require("aws-sdk")
const { logger }  = require("../utils/logger")

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

const ses = new AWS.SES({ apiVersion: "2010-12-01" })

export const sendEmail = async (to, subject, body) => {
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: process.env.EMAIL_FROM ,
  }

  try {
    const result = await ses.sendEmail(params).promise()
    logger.info(`Email sent to ${to}: ${result.MessageId}`)
    return result
  } catch (error) {
    logger.error(`Error sending email: ${error}`)
    throw error
  }
}

