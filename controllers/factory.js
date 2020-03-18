const { getRatpApiAdapter } = require("../adapters/ratp-api/factory");
const SchedulesController = require("../controllers/schedules");

const apiAdapter = getRatpApiAdapter();
const _schedulesController = new SchedulesController({
  apiAdapter: apiAdapter
});

module.exports = getSchedulesController = () => _schedulesController;
