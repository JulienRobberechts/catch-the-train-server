const { getSchedulesForAMission } = require("./missionsCache");
const { calculateMissionsForJourney } = require("./missionSchedule");

async function getSchedulesForMissions(missionsRepository, missions) {
  return Promise.all(
    missions.map((mission) => {
      return getSchedulesForAMission(missionsRepository)(mission.missionCode);
    })
  );
}

module.exports = { getSchedulesForMissions };
