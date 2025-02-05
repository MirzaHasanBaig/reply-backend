const express  = require("express")
const cors  = require("cors")
const helmet  = require("helmet")
const compression  = require("compression")
const rateLimit  = require("express-rate-limit")
const { connectDB }  = require("./config/database")
const { setupRedis }  = require("./config/redis")
const { setupBull }  = require("./config/bull")
const { setupCron }  = require("./config/cron")
const { errorHandler }  = require("./middleware/errorHandler")
const { loggerMiddleware }  = require("./middleware/logger")
const { authMiddleware }  = require("./middleware/auth")
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { roleMiddleware }  = require("./middleware/roleMiddleware")
const routes  = require("./routes");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggerMiddleware)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// Connect to database
connectDB()

// Setup Redis
setupRedis()

// Setup Bull
setupBull()

// Setup Cron jobs
setupCron()

// Routes
app.use("/api", routes)

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CPaaS API",
      version: "1.0.0",
      description: "Communication Platform as a Service API Documentation",
    },
    servers: [
      {
        url: process.env.BASE_URL, // Change this for production
      },
    ],
  },
  apis: ["src/routes/*.js"], // Path to API routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

