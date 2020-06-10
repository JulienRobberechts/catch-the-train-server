const { getSchedulesForAMission } = require("./missionsCache");
const { calculateMissionsForJourney } = require("./missionSchedule");

const getMissionForJourney = async (
  missionsRepository,
  network,
  line,
  fromStationSlug,
  toStationSlug,
  prospectMissions
) => {
  if (!network || !line || !fromStationSlug || !toStationSlug) return null;

  const missionsSchedules = await getSchedulesForMissions(
    missionsRepository,
    prospectMissions
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
