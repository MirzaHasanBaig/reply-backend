const { BaseError } = require("./errors.js");

const errorHandler = (res, error) => {
  console.error(error);

  if (error instanceof BaseError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  res.status(500).json({ error: "Internal server error" });
};

module.exports = { errorHandler };
