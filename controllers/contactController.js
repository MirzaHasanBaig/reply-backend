const ContactService = require ("../services/contactService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = ContactController = {
  async createContact(req, res) {
    try {
      const contact = await ContactService.createContact(req.body, req.user.id)
      res.status(201).json(contact)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getContact(req, res) {
    try {
      const contact = await ContactService.getContact(req.params.id, req.user.id)
      res.status(200).json(contact)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateContact(req, res) {
    try {
      const contact = await ContactService.updateContact(req.params.id, req.body, req.user.id)
      res.status(200).json(contact)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteContact(req, res) {
    try {
      await ContactService.deleteContact(req.params.id, req.user.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listContacts(req, res) {
    try {
      const contacts = await ContactService.listContacts(req.user.id, req.query)
      res.status(200).json(contacts)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

