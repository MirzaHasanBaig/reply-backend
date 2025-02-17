class BaseError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class ValidationError extends BaseError {
    constructor(message = "Validation error") {
      super(message, 400);
    }
  }
  
  class NotFoundError extends BaseError {
    constructor(message = "Resource not found") {
      super(message, 404);
    }
  }
  
  class AuthenticationError extends BaseError {
    constructor(message = "Authentication failed") {
      super(message, 401);
    }
  }
  
  module.exports = { BaseError, ValidationError, NotFoundError, AuthenticationError };
  