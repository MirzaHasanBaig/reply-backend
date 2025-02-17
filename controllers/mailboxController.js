const MailboxService = require ("../services/mailboxService.js")
const { errorHandler } = require ("../utils/errorHandler.js")

module.exports = MailboxController = {
  async createMailbox(req, res) {
    try {
      const mailbox = await MailboxService.createMailbox(req.body, req.user.id)
      res.status(201).json(mailbox)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async getMailbox(req, res) {
    try {
      const mailbox = await MailboxService.getMailbox(req.params.id)
      res.status(200).json(mailbox)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateMailbox(req, res) {
    try {
      const mailbox = await MailboxService.updateMailbox(req.params.id, req.body)
      res.status(200).json(mailbox)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async deleteMailbox(req, res) {
    try {
      await MailboxService.deleteMailbox(req.params.id)
      res.status(204).send()
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async listMailboxes(req, res) {
    try {
      const mailboxes = await MailboxService.listMailboxes(req.user.id)
      res.status(200).json(mailboxes)
    } catch (error) {
      errorHandler(res, error)
    }
  },

  async updateWarmupStatus(req, res) {
    try {
      const { status, progress } = req.body
      const mailbox = await MailboxService.updateWarmupStatus(req.params.id, status, progress)
      res.status(200).json(mailbox)
    } catch (error) {
      errorHandler(res, error)
    }
  },
}

