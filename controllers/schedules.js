const debug = require("debug")("ctt:api:schedule");
const {
  routesByDepartureStation,
  routesByDestination
} = require("../domains/timeTable/filters");
const { normalizeString } = require("../domains/timeTable/normalizeString");

class SchedulesController {
  constructor({ apiAdapter }) {
    if (!apiAdapter) throw Error("apiAdapter is null");

    this.apiAdapter = apiAdapter;
  }

  async getSchedules({ station, to }) {
    const allSchedules = await this.apiAdapter.getAllSchedulesRATP();

    const routes = allSchedules.routes
      .filter(routesByDepartureStation(normalizeString(station)))
      .filter(routesByDestination(normalizeString(to)));

    return { routes };
  }
}

module.exports = SchedulesController;
