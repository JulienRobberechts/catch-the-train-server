const {
  schedulesRepository,
  schedulesRepositoryMocked,
  missionsRepository,
  missionsRepositoryMocked,
} = require("../adapters/ratp-api");
const SchedulesController = require("../controllers/schedules");
var { RATP_API_MOCK_DATA } = require("../config");

const _schedulesController = new SchedulesController({
  schedulesRepository: RATP_API_MOCK_DATA
    ? schedulesRepositoryMocked
    : schedulesRepository,
  missionsRepository: RATP_API_MOCK_DATA
    ? missionsRepositoryMocked
    : missionsRepository,
});

exports.getSchedulesController = () => _schedulesController;
