const missionsCodes = require("../../../data/ratp/rers/A/missions.json");
const stations = require("../../../data/ratp/rers/A/stations");

function importMissionsCodes() {
  return missionsCodes;
}

function importMissionsSchedules(missionCodes) {
  const missionsSchedules = missionCodes.map((missionCode) => ({
    mission: missionCode,
    ...require(`../../../data/ratp/rers/A/by-mission/stations-${missionCode}.json`),
  }));
  return missionsSchedules;
}

function importStations() {
  return stations;
}

module.exports = {
  importMissionsCodes,
  importMissionsSchedules,
  importStations,
};
