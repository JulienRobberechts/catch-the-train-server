const debug = require("debug")("ctt:api:schedule");
const { routesByMissions } = require("../domains/timeTable/filters");
const {
  checkParameterType,
  checkParameterLine,
  checkParameterStation
} = require("../domains/timeTable/checkParameter");
const config = require("../config");
const { formatSchedule } = require("../domains/ratp/format-schedule");

class SchedulesController {
  constructor({ apiAdapter }) {
    if (!apiAdapter) {
      throw Error("apiAdapter is null");
    }
    this.apiAdapter = apiAdapter;
  }

  async getSchedulesForJourney(now, type, line, station, missions) {
    checkParameterType(type);
    checkParameterLine(type, line);
    checkParameterStation(type, line, station);

    const allSchedules = await this.apiAdapter.getAllSchedulesRATP({
      type,
      line,
      station,
      ...config
    });

    const routes = allSchedules.result.schedules
      .filter(routesByMissions(missions))
      .map(departure => ({
        ...formatSchedule(now, departure.message),
        ...departure
      }))
      .filter(departure => !departure.noPassenger);

    return { at: now, provider: "ratp", type, line, station, routes };
  }
}

module.exports = SchedulesController;
