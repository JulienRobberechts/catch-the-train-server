const missionsCodes = require("../../../data/ratp/rers/A/missions.json");
const stations = require("../../../data/ratp/rers/A/stations");
const { RATP_API_ROOT_URL } = require("../../../config");

function importMissionsCodes() {
  return missionsCodes;
}

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

function importStations() {
  return stations;
}

module.exports = {
  importMissionsCodes,
  importMissionsSchedules,
  importStations,
};
