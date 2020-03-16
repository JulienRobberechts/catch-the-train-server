const debug = require("debug")("ctt:api:schedule");

class SchedulesController {
  constructor({ apiAdapter }) {
    if (!apiAdapter) throw Error("apiAdapter is null");

    this.apiAdapter = apiAdapter;
  }

  async getSchedules({ station, to }) {
    const allSchedules = await this.apiAdapter.getAllSchedulesRATP();

    const route = allSchedules.routes.find(
      route => route.station.code === "SGL"
    );

    return { route };
  }
}

module.exports = SchedulesController;
