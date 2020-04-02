const debug = require("debug")("ctt:api:schedule");
const { routesByMissions } = require("../domains/timeTable/filters");
const {
  checkParameterType,
  checkParameterLine,
  checkParameterStation
} = require("../domains/timeTable/checkParameter");
const config = require("../config");

class SchedulesController {
  constructor({ apiAdapter }) {
    if (!apiAdapter) {
      throw Error("apiAdapter is null");
    }
    this.apiAdapter = apiAdapter;
  }

  async getSchedulesForJourney(type, line, station, missions) {
    checkParameterType(type);
    checkParameterLine(type, line);
    checkParameterStation(type, line, station);

    const allSchedules = await this.apiAdapter.getAllSchedulesRATP({
      type,
      line,
      station,
      ...config
    });

    const routes = allSchedules.result.schedules.filter(
      routesByMissions(missions)
    );

    return { routes };
  }
}

module.exports = SchedulesController;
