var express = require("express");
var router = express.Router();
const debug = require("debug")("ctt:api:schedule");
const { wrapAsync } = require("../utils/errors");

// to put in a factory:
const { getRatpApiAdapter } = require("../adapters/ratp-api/factory");
const apiAdapter = getRatpApiAdapter();

const SchedulesController = require("../controllers/schedules");
const schedulesController = new SchedulesController({ apiAdapter });

// end

router.get(
  "/",
  wrapAsync(async function(req, res, next) {
    const result = await schedulesController.getAllSchedules();
    res.send(result);
  })
);

router.get(
  "/:station",
  wrapAsync(async function(req, res, next) {
    const station = req.params.station;
    const result = await schedulesController.getSchedulesForStation(station);
    res.send(result);
  })
);

router.get(
  "/:station/:to",
  wrapAsync(async function(req, res, next) {
    const station = req.params.station;
    const to = req.params.to;
    const result = await schedulesController.getSchedulesForJourney(
      station,
      to
    );
    res.send(result);
  })
);

module.exports = router;
