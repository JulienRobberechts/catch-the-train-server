const debug = require("debug")("ctt:api:schedule");
const { routesByMissions } = require("../domains/timeTable/filters");
const {
  checkParameterType,
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

  async getSchedulesForJourney(type, line, station, missions) {
    checkParameterType(type);
    checkParameterLine(type, line);
    checkParameterStation(type, line, station);
    checkParameterMissions(type, line, missions);

    const allSchedules = await this.apiAdapter.getAllSchedulesRATP({
      type,
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
      for: {
        at,
        provider,
        type,
        line,
        station,
        missions,
      },
      departures,
    };
  }
}

module.exports = SchedulesController;
