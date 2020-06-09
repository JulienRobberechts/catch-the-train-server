const { getRatpApiAdapter } = require("../adapters/ratp-api/factory");
const SchedulesController = require("../controllers/schedules");
var { RATP_API_MOCK_DATA } = require("../config");

const _schedulesController = new SchedulesController({
  apiAdapter: getRatpApiAdapter(RATP_API_MOCK_DATA),
});

exports.getSchedulesController = () => _schedulesController;
