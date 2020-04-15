var debug = require("debug")("ctt");

class ServerError extends Error {
  constructor(message, externalError) {
    super(message);
    this.name = "ServerError";
    this.externalError = externalError;
  }
}

function handleServerError(error, req, res, next) {
  debug("API Error: ", error);
  if (error instanceof ServerError) {
    // console.log("ServerError", { rawError: error.externalError });

    res.status(503).send({
      errorMessage: error.message,
      errorType: error.name,
    });
  } else {
    next(error);
  }
}

module.exports = { ServerError, handleServerError };
