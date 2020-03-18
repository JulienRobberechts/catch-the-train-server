const debug = require("debug")("ctt:api:schedule");
const {
  routesByDepartureStation,
  routesByDestination
} = require("../domains/timeTable/filters");
const { normalizeString } = require("../domains/timeTable/normalizeString");
const {
  checkParameterStation,
  checkParameterDestination
} = require("../domains/timeTable/checkParameter");
const config = require("../config");

class SchedulesController {
  constructor({ apiAdapter }) {
    if (!apiAdapter) {
      throw Error("apiAdapter is null");
    }
    this.apiAdapter = apiAdapter;
  }

  async getAllSchedules() {
    const allSchedules = await this.apiAdapter.getAllSchedulesRATP(config);
    const routes = allSchedules.routes;
    return { routes };
  }

  async getSchedulesForStation(station) {
    const pStation = normalizeString(station);
    checkParameterStation(station);

    const allSchedules = await this.apiAdapter.getAllSchedulesRATP(config);
    const routes = allSchedules.routes.filter(
      routesByDepartureStation(pStation)
    );
    return { routes };
  }

  async getSchedulesForJourney(station, to) {
    const pStation = normalizeString(station);
    checkParameterStation(station);

    const pTo = normalizeString(to);
    checkParameterDestination(pStation, pTo);

    const allSchedules = await this.apiAdapter.getAllSchedulesRATP(config);

    const routes = allSchedules.routes
      .filter(routesByDepartureStation(pStation))
      .filter(routesByDestination(pTo));

    return { routes };
  }
}

module.exports = SchedulesController;
