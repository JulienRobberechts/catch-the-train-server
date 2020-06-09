const { getSchedulesForMissions } = require("./missionsRepositoryCache");
const { calculateMissionsForJourney } = require("./missionSchedule");

function onlyUnique(mission, index, sourceArray) {
  return sourceArray.findIndex((m) => m === mission) === index;
}

const getMissionForJourney = async (
  getMissionDetailMethod,
  network,
  line,
  fromStationSlug,
  toStationSlug,
  prospectMissions
) => {
  if (!network || !line || !fromStationSlug || !toStationSlug) return null;

  const uniqueMissionsCodes = prospectMissions.filter(onlyUnique);

  const missionsSchedules = await getSchedulesForMissions(
    getMissionDetailMethod,
    uniqueMissionsCodes
  );

  const missions = calculateMissionsForJourney(
    missionsSchedules,
    fromStationSlug,
    toStationSlug
  );
  return missions;
};

module.exports = getMissionForJourney;
