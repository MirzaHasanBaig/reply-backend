const Contact = require ("../models/contact.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = ContactService = {
  async createContact(contactData, userId) {
    const contact = new Contact({
      ...contactData,
      owner: userId,
    })
    await contact.save()
    return contact
  },

  async getContact(contactId, userId) {
    const contact = await Contact.findOne({ _id: contactId, owner: userId })
    if (!contact) {
      throw new NotFoundError("Contact not found")
    }
    return contact
  },

  async updateContact(contactId, updateData, userId) {
    const contact = await Contact.findOneAndUpdate({ _id: contactId, owner: userId }, updateData, { new: true })
    if (!contact) {
      throw new NotFoundError("Contact not found")
    }
    return contact
  },

  async deleteContact(contactId, userId) {
    const result = await Contact.findOneAndDelete({ _id: contactId, owner: userId })
    if (!result) {
      throw new NotFoundError("Contact not found")
    }
  },

  async listContacts(userId, query) {
    const { page = 1, limit = 10, search, tags } = query
    const filter = { owner: userId }

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ]
    }

    if (tags) {
      filter.tags = { $all: tags.split(",") }
    }

    const contacts = await Contact.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await Contact.countDocuments(filter)

    return {
      contacts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  },
}

