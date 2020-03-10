var express = require('express');
var router = express.Router();
const debug = require("debug")("ctt:api:schedule");

const SchedulesController = require("../controllers/schedules");
const schedulesController = new SchedulesController();

router.get('/', async function(req, res, next) {
  const result = await schedulesController.getSchedules();
  debug('return : ' + JSON.stringify(result));
  res.send(result);
});

module.exports = router;
