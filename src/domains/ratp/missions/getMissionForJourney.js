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

async function getSchedulesForMissions(missionsRepository, missions) {
  return Promise.all(
    missions.map((mission) => {
      return getSchedulesForAMission(missionsRepository)(mission.missionCode);
    })
  );
}

module.exports = getMissionForJourney;
