var debug = require("debug")("server");

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function handleValidationError(error, req, res, next) {
  debug("API Error: ", error);
  if (error instanceof ValidationError) {
    res.status(400).json({
      errorMessage: error.message,
      errorType: error.name
    });
  }
  next(error);
}

module.exports = { ValidationError, handleValidationError };
