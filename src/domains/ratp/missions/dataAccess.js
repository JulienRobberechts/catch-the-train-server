const { RATP_API_ROOT_URL } = require("../../../config");

async function importMissionsSchedules(getMissionDetailMethod, missionCodes) {
  const schedules = Promise.all(
    missionCodes.map((missionCode) => {
      return importMissionSchedule(getMissionDetailMethod, missionCode);
    })
  );
  return schedules;
}

async function importMissionSchedule(getMissionDetailMethod, missionCode) {
  const result = await getMissionDetailMethod({
    RATP_API_ROOT_URL,
    missionCode,
  });
  return {
    mission: missionCode,
    stations: result.result.stations.map((station) => station.slug),
  };
}

module.exports = {
  importMissionsSchedules,
};
