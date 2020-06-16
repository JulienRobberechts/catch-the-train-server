const {
  getMissionForJourney,
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
} = require("../domains/timeTable/checkParameter");
const { RATP_API_ROOT_URL } = require("../config");
const { formatSchedule } = require("../domains/ratp/schedule");
const { createTrainCode } = require("../domains/ratp/create-train-code");
const { getStationName } = require("../domains/ratp/getStation");
const getMissionsFromSchedule = require("../domains/ratp/getMissionsFromSchedule");

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

    const departures1 = allSchedules.result.schedules.map((departure) => ({
      ...formatSchedule(at, departure.message),
      mission: departure ? departure.code.toUpperCase() : null,
      displayAttributes: departure.message,
      displayDestination: departure.destination,
    }));

    const prospectMissions = getMissionsFromSchedule(departures1);
    const prospectMissionsData = prospectMissions
      .map((missionCode) => ({
        missionCode,
        ...decodeMission(line, missionCode),
      }))
      // .map((m) => console.log("m :>> ", m) || m)
      // .map((m) => console.log("m2 :>> ", m) || m)
      .filter((m) => m.type !== MissionTypeInvalid)
      .filter((m) => m.type !== MissionTypeNonCommercial)
      .map((m) => m.missionCode);

    console.log("prospectMissionsData :>> ", prospectMissionsData);
    // TODO: use prospectMissionsData.

    const targetMissions = await getMissionForJourney(
      this.missionsRepository,
      network,
      line,
      fromStationSlug,
      toStationSlug,
      prospectMissions
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
