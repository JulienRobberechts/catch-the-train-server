var debug = require("debug")("server");

function wrapAsync(fn) {
  return function (req, res, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
  };
}

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

module.exports = { wrapAsync, handleAllError };
