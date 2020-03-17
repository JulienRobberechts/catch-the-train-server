var debug = require("debug")("ctt");

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function handleValidationError(error, req, res, next) {
  debug("API Error: ", error);
  if (error instanceof ValidationError) {
    res.status(400).send({
      errorMessage: error.message,
      errorType: error.name
    });
  } else {
    next(error);
  }
}

module.exports = { ValidationError, handleValidationError };
