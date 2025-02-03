const Queue  = require("bull")
const { redis }  = require("./redis")

const emailQueue = new Queue("email", { redis })
const smsQueue = new Queue("sms", { redis })
const whatsappQueue = new Queue("whatsapp", { redis })

const setupBull = () => {
  // Setup queue processors
  emailQueue.process(async (job) => {
    // Process email jobs
  })

  smsQueue.process(async (job) => {
    // Process SMS jobs
  })

  whatsappQueue.process(async (job) => {
    // Process WhatsApp jobs
  })
}


module.exports = {emailQueue,smsQueue,whatsappQueue,setupBull}