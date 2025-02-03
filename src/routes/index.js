const { Router } = require("express")
// const authRoutes  = require("./authRoutes")
// const userRoutes  = require("./userRoutes")
// const campaignRoutes  = require("./campaignRoutes")
// const contactRoutes  = require("./contactRoutes")
// const chatbotRoutes  = require("./chatbotRoutes")
// const webinarRoutes  = require("./webinarRoutes")
// const automationRoutes  = require("./automationRoutes")
// const productRoutes  = require("./productRoutes")
// const orderRoutes  = require("./orderRoutes")
// const newsletterRoutes  = require("./newsletterRoutes")
// const integrationRoutes  = require("./integrationRoutes")
//  const { adminMiddleware }  = require("../middleware/auth")

const router = Router()

// router.use("/auth", authRoutes)
// router.use("/users", userRoutes)
// router.use("/campaigns", campaignRoutes)
// router.use("/contacts", contactRoutes)
// router.use("/chatbots", chatbotRoutes)
// router.use("/webinars", webinarRoutes)
// router.use("/automations", automationRoutes)
// router.use("/products", productRoutes)
// router.use("/orders", orderRoutes)
// router.use("/newsletters", newsletterRoutes)
// router.use("/integrations", integrationRoutes)

// Admin routes
// router.use("/admin", adminMiddleware, (adminRouter) => {
//   adminRouter.use("/users", userRoutes)
//   // Add other admin routes here
// })

module.exports = router

