const {
  getSchedulesForMissions: getSchedulesForMissionsFromRepository,
} = require("./missionsRepository");

async function getSchedulesForMissions(getMissionDetailMethod, missionCodes) {
  const value = await getSchedulesForMissionsFromRepository(
    getMissionDetailMethod,
    missionCodes
  );
  return value;
}

module.exports = {
  getSchedulesForMissions,
};
