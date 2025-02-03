const jwt  = require("jsonwebtoken")
const { User }  = require("../models/User")

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers("Authorization")?.replace("Bearer ", "")

    if (!token) {
      throw new Error()
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET )
    const user = await User.findById(decoded.userId)

    if (!user) {
      throw new Error()
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." })
  }
}

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(403).send({ error: "Access denied." })
  }
}

module.exports = {adminMiddleware,authMiddleware}

