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
app.use("/api", authMiddleware, roleMiddleware(["user", "admin"]), routes)

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

