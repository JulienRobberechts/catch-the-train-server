var debug = require("debug")("ctt");

class ConnectivityError extends Error {
  constructor(message, externalError) {
    super(message);
    this.name = "ConnectivityError";
    this.externalError = externalError;
  }
}

function handleConnectivityError(error, req, res, next) {
  debug("API Error: ", error);
  if (error instanceof ConnectivityError) {
    // console.log("ConnectivityError", { rawError: error.externalError });

    res.status(503).send({
      errorMessage: error.message,
      errorType: error.name,
    });
  } else {
    next(error);
  }
}

module.exports = { ConnectivityError, handleConnectivityError };
