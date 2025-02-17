const { BaseError, ValidationError, NotFoundError, AuthenticationError } = require ("../utils/errors.js")
module.exports = errorMiddleware = (err, req, res, next) => {
  console.error(err)

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message })
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message })
  }

  if (err instanceof AuthenticationError) {
    return res.status(401).json({ error: err.message })
  }

  res.status(500).json({ error: "Internal server error" })
}

