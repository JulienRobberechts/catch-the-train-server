const { getMissionForJourney } = require("../domains/ratp/missions");
const debug = require("debug")("ctt:api:schedule");
const { routesByRatpMissions } = require("../domains/timeTable/filters");
const {
  checkParameterNetwork,
  checkParameterLine,
  checkParameterStation,
} = require("../domains/timeTable/checkParameter");
const { RATP_API_ROOT_URL } = require("../config");
const { formatSchedule } = require("../domains/ratp/format-schedule");
const { createTrainCode } = require("../domains/ratp/create-train-code");
const { getStationName } = require("../domains/ratp/getStationName");

class SchedulesController {
  constructor({ schedulesRepository, missionsRepository }) {
    if (!schedulesRepository) {
      throw Error("schedulesRepository is null");
    }
    if (!missionsRepository) {
      throw Error("missionsRepository is null");
    }
    this.schedulesRepository = schedulesRepository;
    this.missionsRepository = missionsRepository;
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

    const allSchedules = await this.schedulesRepository.getAllSchedulesRATP(
      RATP_API_ROOT_URL,
      {
        network,
        line,
        station: fromStationSlug,
      }
    );

    const at = allSchedules._metadata.date;

    // TODO: Refactor
    const prospectMissions = allSchedules.result.schedules.map((departure) =>
      departure.code.toUpperCase()
    );

    const missions = await getMissionForJourney(
      this.missionsRepository,
      network,
      line,
      fromStationSlug,
      toStationSlug,
      prospectMissions
    );
    //----

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
