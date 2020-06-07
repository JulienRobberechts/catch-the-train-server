const {
  getMissionForJourney,
  displayUnknownMissionsCodes,
} = require("../domains/ratp/missions");
const debug = require("debug")("ctt:api:schedule");
const { routesByRatpMissions } = require("../domains/timeTable/filters");
const {
  checkParameterNetwork,
  checkParameterLine,
  checkParameterStation,
} = require("../domains/timeTable/checkParameter");
const config = require("../config");
const { formatSchedule } = require("../domains/ratp/format-schedule");
const { createTrainCode } = require("../domains/ratp/create-train-code");
const { getStationName } = require("../domains/ratp/getStationName");

class SchedulesController {
  constructor({ apiAdapter }) {
    if (!apiAdapter) {
      throw Error("apiAdapter is null");
    }
    this.apiAdapter = apiAdapter;
  }

  async getSchedulesForJourneyByDestination(
    network,
    line,
    fromStationSlug,
    toStationSlug
  ) {
    checkParameterNetwork(network);
    checkParameterLine(network, line);
    checkParameterStation(network, line, fromStationSlug);
    checkParameterStation(network, line, toStationSlug);

    const allSchedules = await this.apiAdapter.getAllSchedulesRATP({
      network,
      line,
      station: fromStationSlug,
      ...config,
    });

    const at = allSchedules._metadata.date;
    const missions = getMissionForJourney(
      network,
      line,
      fromStationSlug,
      toStationSlug
    );
    const departures = allSchedules.result.schedules
      .filter(routesByRatpMissions(missions))
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

    displayUnknownMissionsCodes(network, line, departures);

    const provider = "ratp";
    const station = {
      name: getStationName(network, line, fromStationSlug),
      slug: fromStationSlug,
    };
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
