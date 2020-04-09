var debug = require("debug")("ctt");

class ConnectivityError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConnectivityError";
  }
}

function handleConnectivityError(error, req, res, next) {
  debug("API Error: ", error);
  if (error instanceof ConnectivityError) {
    res.status(503).send({
      errorMessage: error.message,
      errorType: error.name
    });
  } else {
    next(error);
  }
}

module.exports = { ConnectivityError, handleConnectivityError };
