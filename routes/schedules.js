var express = require("express");
var router = express.Router();
const { wrapAsync } = require("../utils/errors");
const { getSchedulesController } = require("../controllers/factory");
const debug = require("debug")("ctt:api:schedule");

const schedulesController = getSchedulesController();

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
