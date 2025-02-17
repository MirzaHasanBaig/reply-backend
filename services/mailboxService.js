const Mailbox = require ("../models/mailbox.js")
const { NotFoundError } = require ("../utils/errors.js")

module.exports = MailboxService = {
  async createMailbox(mailboxData, userId) {
    const mailbox = new Mailbox({
      ...mailboxData,
      user: userId,
    })
    await mailbox.save()
    return mailbox
  },

  async getMailbox(mailboxId) {
    const mailbox = await Mailbox.findById(mailboxId)
    if (!mailbox) {
      throw new NotFoundError("Mailbox not found")
    }
    return mailbox
  },

  async updateMailbox(mailboxId, updateData) {
    const mailbox = await Mailbox.findByIdAndUpdate(mailboxId, updateData, { new: true })
    if (!mailbox) {
      throw new NotFoundError("Mailbox not found")
    }
    return mailbox
  },

  async deleteMailbox(mailboxId) {
    const result = await Mailbox.findByIdAndDelete(mailboxId)
    if (!result) {
      throw new NotFoundError("Mailbox not found")
    }
  },

  async listMailboxes(userId) {
    return Mailbox.find({ user: userId })
  },

  async updateWarmupStatus(mailboxId, status, progress) {
    const mailbox = await Mailbox.findById(mailboxId)
    if (!mailbox) {
      throw new NotFoundError("Mailbox not found")
    }
    mailbox.warmupStatus = status
    mailbox.warmupProgress = progress
    await mailbox.save()
    return mailbox
  },
}

