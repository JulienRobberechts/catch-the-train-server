const { displayUnknownMissionsCodes } = require("../domains/ratp/mission");
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
const { getStationName } = require("../domains/ratp/getStationName");

class SchedulesController {
  constructor({ apiAdapter }) {
    if (!apiAdapter) {
      throw Error("apiAdapter is null");
    }
    this.apiAdapter = apiAdapter;
  }

  async getSchedulesForJourney(network, line, stationSlug, missions) {
    checkParameterNetwork(network);
    checkParameterLine(network, line);
    checkParameterStation(network, line, stationSlug);
    checkParameterMissions(network, line, missions);

    const allSchedules = await this.apiAdapter.getAllSchedulesRATP({
      network,
      line,
      station: stationSlug,
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

    displayUnknownMissionsCodes(departures);

    const provider = "ratp";
    const station = {
      name: getStationName(network, line, stationSlug),
      slug: stationSlug,
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
    // fill missions with destination information
    const missions = undefined;
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
