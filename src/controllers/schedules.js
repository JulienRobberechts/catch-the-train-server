const { missionIsValid } = require("../domains/timeTable/checkParameter");
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

    checkMissionsCodes(departures);

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
}

const checkMissionsCodes = (departures) => {
  try {
    if (!departures) return;

    const unknownMissions = departures
      .filter((departure) => !departure.noPassenger)
      .map((departure) => departure.mission)
      .filter(uniqueItem)
      .filter((m) => !missionIsValid(m));

    if (unknownMissions.length > 0) {
      console.warn("Unknown Missions", { unknownMissions });
    }
  } catch (error) {
    console.warn("error in checkMissionsCodes", error);
  }
};

const uniqueItem = (value, index, array) => array.indexOf(value) === index;

module.exports = SchedulesController;
