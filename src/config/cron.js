const cron  = require("node-cron")

const setupCron = () => {
  // Schedule tasks
  cron.schedule("0 0 * * *", () => {
    // Daily task
  })

  cron.schedule("0 0 * * 0", () => {
    // Weekly task
  })
}

module.exports = {setupCron};
