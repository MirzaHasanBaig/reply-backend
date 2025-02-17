const express = require("express");
const mongoose = require ("mongoose")
const cors = require ("cors")
const helmet = require ("helmet")
const rateLimit = require ("express-rate-limit")
const swaggerUi = require ("swagger-ui-express")
const swaggerJsdoc = require ("swagger-jsdoc")
const dotenv = require ("dotenv")
const { createServer } = require ("http")
const { Server } = require ("socket.io")
const compression = require ("compression")
const mongoSanitize = require ("express-mongo-sanitize")
const hpp = require ("hpp")
const xss = require ("xss-clean")
const morgan = require ("morgan")
const winston = require ("winston")
//const ("express-async-errors")

const errorMiddleware = require ("./middleware/errorMiddleware.js")
const authMiddleware = require ("./middleware/authMiddleware.js")

// const all routes
const userRoutes = require ("./routes/userRoutes.js")
const teamRoutes = require ("./routes/teamRoutes.js")
const contactRoutes = require ("./routes/contactRoutes.js")
const messagingRoutes = require ("./routes/messagingRoutes.js")
const voiceRoutes = require ("./routes/voiceRoutes.js")
const videoRoutes = require ("./routes/videoRoutes.js")
//const emailRoutes = require ("./routes/emailRoutes.js")
//const chatRoutes = require ("./routes/chatRoutes.js")
const chatbotRoutes = require ("./routes/chatbotRoutes.js")
//const workflowRoutes = require ("./routes/workflowRoutes.js")
const integrationRoutes = require ("./routes/integrationRoutes.js")
const webhookRoutes = require ("./routes/webhookRoutes.js")
const apiManagementRoutes = require ("./routes/apiManagementRoutes.js")
//const numberManagementRoutes = require ("./routes/numberManagementRoutes.js")
//const sipTrunkingRoutes = require ("./routes/sipTrunkingRoutes.js")
//const faxRoutes = require ("./routes/faxRoutes")
//const pushNotificationRoutes = require ("./routes/pushNotificationRoutes.js")
//const analyticsRoutes = require ("./routes/analyticsRoutes.js")
//const billingRoutes = require ("./routes/billingRoutes.js")
// const fileStorageRoutes = require ("./routes/fileStorageRoutes.js")
// const dataconstExportRoutes = require ("./routes/dataconstExportRoutes.js")
// const complianceRoutes = require ("./routes/complianceRoutes.js")
// const developerRoutes = require ("./routes/developerRoutes.js")
// const geolocationRoutes = require ("./routes/geolocationRoutes.js")
// const speechToTextRoutes = require ("./routes/speechToTextRoutes.js")
// const sentimentAnalysisRoutes = require ("./routes/sentimentAnalysisRoutes.js")
// const nlpRoutes = require ("./routes/nlpRoutes.js")
// const mlRoutes = require ("./routes/mlRoutes.js")
// const iotRoutes = require ("./routes/iotRoutes.js")
// const blockchainRoutes = require ("./routes/blockchainRoutes.js")
// const arRoutes = require ("./routes/arRoutes.js")
// const vrRoutes = require ("./routes/vrRoutes.js")
const campaignRoutes = require ("./routes/campaignRoutes.js")
const aiAssistantRoutes = require ("./routes/aiAssistantRoutes.js")

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST","PUT","PATCH","DELETE"],
  },
})

// Middleware
app.use(cors())
app.use(helmet())
app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ extended: true, limit: "10kb" }))
app.use(compression())
app.use(mongoSanitize())
app.use(hpp())
app.use(xss())

// Logging
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "cpaas-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
})

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  )
}

app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Futuristic CPaaS API",
      version: "1.0.0",
      description: "API documentation for the Futuristic CPaaS platform",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
    components: {
      securitySchemes: {
        authorization: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        authorization: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes
app.use("/api/users", userRoutes)
app.use("/api/teams", authMiddleware, teamRoutes)
app.use("/api/contacts", authMiddleware, contactRoutes)
app.use("/api/messaging", authMiddleware, messagingRoutes)
app.use("/api/voice", authMiddleware, voiceRoutes)
app.use("/api/video", authMiddleware, videoRoutes)
//app.use("/api/email", authMiddleware, emailRoutes)
// app.use("/api/chat", authMiddleware, chatRoutes)
app.use("/api/chatbots", authMiddleware, chatbotRoutes)
//app.use("/api/workflows", authMiddleware, workflowRoutes)
app.use("/api/integrations", authMiddleware, integrationRoutes)
app.use("/api/webhooks", authMiddleware, webhookRoutes)
app.use("/api/api-management", authMiddleware, apiManagementRoutes)
// app.use("/api/numbers", authMiddleware, numberManagementRoutes)
// app.use("/api/sip", authMiddleware, sipTrunkingRoutes)
// app.use("/api/fax", authMiddleware, faxRoutes)
// app.use("/api/push-notifications", authMiddleware, pushNotificationRoutes)
// app.use("/api/analytics", authMiddleware, analyticsRoutes)
// app.use("/api/billing", authMiddleware, billingRoutes)
// app.use("/api/storage", authMiddleware, fileStorageRoutes)
// app.use("/api/data", authMiddleware, dataconstExportRoutes)
// app.use("/api/compliance", authMiddleware, complianceRoutes)
// app.use("/api/developer", developerRoutes)
// app.use("/api/geolocation", authMiddleware, geolocationRoutes)
// app.use("/api/speech-to-text", authMiddleware, speechToTextRoutes)
// app.use("/api/sentiment", authMiddleware, sentimentAnalysisRoutes)
// app.use("/api/nlp", authMiddleware, nlpRoutes)
// app.use("/api/ml", authMiddleware, mlRoutes)
// app.use("/api/iot", authMiddleware, iotRoutes)
// app.use("/api/blockchain", authMiddleware, blockchainRoutes)
// app.use("/api/ar", authMiddleware, arRoutes)
// app.use("/api/vr", authMiddleware, vrRoutes)
app.use("/api/campaigns", authMiddleware, campaignRoutes)
app.use("/api/ai-assistants", authMiddleware, aiAssistantRoutes)

// WebSocket setup
io.on("connection", (socket) => {
  console.log("A user connected")

  socket.on("join_room", (roomId) => {
    socket.join(roomId)
  })

  socket.on("leave_room", (roomId) => {
    socket.leave(roomId)
  })

  socket.on("send_message", (data) => {
    io.to(data.roomId).emit("receive_message", data)
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected")
  })
})

// Error handling middleware
app.use(errorMiddleware)

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

//module.exports =  app

