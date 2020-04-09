const { getRatpApiAdapter } = require("../adapters/ratp-api/factory");
const SchedulesController = require("../controllers/schedules");
var config = require("../config");

const _schedulesController = new SchedulesController({
  apiAdapter: getRatpApiAdapter(config)
});

exports.getSchedulesController = () => _schedulesController;
