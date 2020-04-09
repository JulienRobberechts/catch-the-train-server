var debug = require("debug")("ctt");

function handleAllError(error, req, res, next) {
  debug("API Error: ", error);
  if (process.env.NODE_ENV !== "production") {
    res.status(500).json({
      errorMessage: error.message,
      errorType: error.name,
      errorStack: error.stack
    });
  } else {
    res.status(500).json({ errorMessage: "Internal error in Event API" });
  }
}

module.exports = handleAllError;
