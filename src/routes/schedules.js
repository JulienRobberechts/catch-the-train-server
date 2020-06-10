var express = require("express");
var router = express.Router();
const { wrapAsync } = require("../utils/errors");
const { getSchedulesController } = require("../controllers/factory");
const debug = require("debug")("ctt:api:schedule");

const schedulesController = getSchedulesController();

router.get(
  "/:network/:line/:fromStation/:toStation",
  wrapAsync(async function (req, res, next) {
    const { network, line, fromStation, toStation } = req.params;
    const result = await schedulesController.getSchedulesForJourneyByDestination(
      network,
      line,
      fromStation,
      toStation
    );
    res.send(result);
  })
);

module.exports = router;
