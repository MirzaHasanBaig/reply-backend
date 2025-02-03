const { Audience }  = require("../models/Audience")
const { Contact }  = require("../models/Contact")
const { logger }  = require("../utils/logger")

export const createAudience = async (userId, audienceData: any) => {
  try {
    const audience = new Audience({ ...audienceData, user: userId })
    await audience.save()
    logger.info(`Audience created: ${audience.id}`)
    return audience
  } catch (error) {
    logger.error(`Error creating audience: ${error}`)
    throw error
  }
}

export const validateAudience = async (audienceId) => {
  try {
    const audience = await Audience.findById(audienceId)
    if (!audience) throw new Error("Audience not found")

    const validContacts = await Contact.find({ _id: { $in: audience.contacts } })
    const invalidContacts = audience.contacts.filter(
      (contact) => !validContacts.find((vc) => vc._id.toString() === contact.toString()),
    )

    audience.validContacts = validContacts.map((contact) => contact._id)
    audience.invalidContacts = invalidContacts
    await audience.save()

    logger.info(`Audience validated: ${audienceId}`)
    return { validContacts: audience.validContacts, invalidContacts: audience.invalidContacts }
  } catch (error) {
    logger.error(`Error validating audience: ${error}`)
    throw error
  }
}

