const Joi  = require("joi")

export const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("user", "admin"),
  })

  return schema.validate(user)
}

export const validateCampaign = (campaign) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid("email", "sms", "whatsapp").required(),
    content: Joi.string().required(),
    schedule: Joi.date(),
    status: Joi.string().valid("draft", "scheduled", "sent"),
    recipients: Joi.array().items(Joi.string()),
  })

  return schema.validate(campaign)
}

