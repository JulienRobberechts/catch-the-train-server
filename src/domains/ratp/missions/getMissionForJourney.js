const { getSchedulesForAMission } = require("./missionsCache");
const { calculateMissionsForJourney } = require("./missionSchedule");

function onlyUnique(mission, index, sourceArray) {
  return sourceArray.findIndex((m) => m === mission) === index;
}

const getMissionForJourney = async (
  missionsRepository,
  network,
  line,
  fromStationSlug,
  toStationSlug,
  prospectMissions
) => {
  if (!network || !line || !fromStationSlug || !toStationSlug) return null;

  const uniqueMissionsCodes = prospectMissions.filter(onlyUnique);

  const missionsSchedules = await getSchedulesForMissions(
    missionsRepository,
    uniqueMissionsCodes
  );

  const missions = calculateMissionsForJourney(
    missionsSchedules,
    fromStationSlug,
    toStationSlug
  );
  return missions;
};

async function getSchedulesForMissions(missionsRepository, missionCodes) {
  return Promise.all(
    missionCodes.map(getSchedulesForAMission(missionsRepository))
  );
}

module.exports = getMissionForJourney;
