var express = require("express");
var router = express.Router();
const { wrapAsync } = require("../utils/errors");
const { getSchedulesController } = require("../controllers/factory");
const debug = require("debug")("ctt:api:schedule");

const schedulesController = getSchedulesController();

router.get(
  "/:type/:line/:station",
  wrapAsync(async function(req, res, next) {
    const { type, line, station } = req.params;
    const missions = null;
    const result = await schedulesController.getSchedulesForJourney(
      type,
      line,
      station,
      missions
    );
    res.send(result);
  })
);

module.exports = router;
