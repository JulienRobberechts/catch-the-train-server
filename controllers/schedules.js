const debug = require("debug")("ctt:api:schedule");
const { routesByMissions } = require("../domains/timeTable/filters");
const {
  checkParameterNetwork,
  checkParameterLine,
  checkParameterStation,
  checkParameterMissions,
} = require("../domains/timeTable/checkParameter");
const config = require("../config");
const { formatSchedule } = require("../domains/ratp/format-schedule");
const { createTrainCode } = require("../domains/ratp/create-train-code");

class SchedulesController {
  constructor({ apiAdapter }) {
    if (!apiAdapter) {
      throw Error("apiAdapter is null");
    }
    this.apiAdapter = apiAdapter;
  }

  async getSchedulesForJourney(network, line, station, missions) {
    checkParameterNetwork(network);
    checkParameterLine(network, line);
    checkParameterStation(network, line, station);
    checkParameterMissions(network, line, missions);

    const allSchedules = await this.apiAdapter.getAllSchedulesRATP({
      network,
      line,
      station,
      ...config,
    });

    const at = allSchedules._metadata.date;
    const departures = allSchedules.result.schedules
      .filter(routesByMissions(missions))
      .map((departure) => ({
        ...formatSchedule(at, departure.message),
        mission: departure.code,
        displayAttributes: departure.message,
        displayDestination: departure.destination,
      }))
      .filter((departure) => departure.departureTime)
      .map((departure) => ({
        trainCode: createTrainCode(departure.departureTime),
        ...departure,
      }));

    const provider = "ratp";
    return {
      context: {
        at,
        provider,
        network,
        line,
        station,
        missions,
      },
      departures,
    };
  }
}

module.exports = SchedulesController;
