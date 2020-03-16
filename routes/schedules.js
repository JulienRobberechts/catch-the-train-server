var express = require("express");
var router = express.Router();
const debug = require("debug")("ctt:api:schedule");

const apiAdapter = process.env.SAMPLE_MODE
  ? require("../adapters/ratp-api-adapter.mock")
  : require("../adapters/ratp-api-adapter");

const SchedulesController = require("../controllers/schedules");
const schedulesController = new SchedulesController({ apiAdapter });

router.get("/", async function(req, res, next) {
  const result = await schedulesController.getSchedules({});
  debug("return : " + JSON.stringify(result));
  res.send(result);
});

router.get("/:station", async function(req, res, next) {
  const station = req.params.station;
  const result = await schedulesController.getSchedules({ station });
  debug("return : " + JSON.stringify(result));
  res.send(result);
});

router.get("/:station/:to", async function(req, res, next) {
  const station = req.params.station;
  const to = req.params.to;
  const result = await schedulesController.getSchedules({ station, to });
  debug("return : " + JSON.stringify(result));
  res.send(result);
});

module.exports = router;
