var express = require("express");
var router = express.Router();
const { wrapAsync } = require("../utils/errors");
const debug = require("debug")("ctt:api:schedule");
const { ValidationError } = require("../utils/errors");
const { ConnectivityError } = require("../utils/errors");
const getCurrentServerIp = require("../domains/config/getIp");
const packageJson = require("../package.json");

router.get("/", function(req, res, next) {
  debug("ping check received");
  res.send({ status: "ok" });
});

router.get("/parameters", async function(req, res, next) {
  const serverPublicIp = await getCurrentServerIp();
  const { version } = packageJson;
  res.send({ status: "ok", serverPublicIp, version });
});

router.get(
  "/error-async",
  wrapAsync(async function(req, res, next) {
    debug("error-async check received");
    throw Error("sample asynchronous error message");
  })
);

router.get("/error-sync", function(req, res, next) {
  debug("error-sync check received");
  throw Error("sample synchronous error message");
});

router.get(
  "/error-validation",
  wrapAsync(async function(req, res, next) {
    debug("error-validation check received");
    throw new ValidationError("sample validation error message");
  })
);

router.get(
  "/error-connectivity",
  wrapAsync(async function(req, res, next) {
    debug("error-connectivity check received");
    throw new ConnectivityError("sample connectivity error message");
  })
);

module.exports = router;
