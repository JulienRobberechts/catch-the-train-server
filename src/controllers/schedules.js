const {
  getSchedulesForMissions,
  calculateMissionsForJourney,
  decodeMission,
  MissionTypeInvalid,
  MissionTypeStandard,
  MissionTypeSpecialAllStations,
  MissionTypeNonCommercial,
} = require("../domains/ratp/missions");
const debug = require("debug")("ctt:api:schedule");
const { routesByRatpMissions } = require("../domains/timeTable/filters");
const {
  checkParameterNetwork,
  checkParameterLine,
  checkParameterStation,
  checkParameterStationAsDeparture,
} = require("../domains/timeTable/checkParameter");
const { RATP_API_ROOT_URL } = require("../config");
const { formatSchedule } = require("../domains/ratp/schedule");
const { createTrainCode } = require("../domains/ratp/create-train-code");
const { getStationName } = require("../domains/ratp/getStation");
const getMissionsFromSchedule = require("../domains/ratp/getMissionsFromSchedule");
const config = require("../config");

// TODO: group error exports together
const { ApplicationError } = require("../utils/errors/applicationError");
const ErrorCodes = require("../utils/errors/errorCodes");

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
    checkParameterStationAsDeparture(network, line, fromStationSlug);
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

    const departures0 = allSchedules.result.schedules.map((departure) => ({
      ...formatSchedule(at, departure.message),
      mission: departure ? departure.code.toUpperCase() : null,
      displayAttributes: departure.message,
      displayDestination: departure.destination,
    }));

    if (config.RAISE_INVALID_DEPARTURES) {
      const invalidDepartures = departures0.filter(
        (departure) => !!departure.error
      );
      if (invalidDepartures.length > 0)
        throw new ApplicationError(
          ErrorCodes.ERROR_50110_IMPLEMENTATION_NOT_SUPPORTED_SCHEDULE_FORMAT_ERROR,
          { invalidDepartures, allDepartures: departures0 }
        );
    }

    const departures1 = departures0.filter((departure) => !departure.error);

    const prospectMissions = getMissionsFromSchedule(departures1)
      .map(decodeMission(line))
      .filter((m) => m.type !== MissionTypeInvalid)
      .filter((m) => m.type !== MissionTypeNonCommercial);

    const missionsSchedules = await getSchedulesForMissions(
      this.missionsRepository,
      prospectMissions
    );
    // console.log("missionsSchedules :>> ", missionsSchedules);

    const targetMissions = calculateMissionsForJourney(
      missionsSchedules,
      fromStationSlug,
      toStationSlug
    );

    const departures2 = departures1
      .filter(routesByRatpMissions(targetMissions))
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
        missions: targetMissions,
      },
      departures: departures2,
    };
  }
}

module.exports = SchedulesController;
