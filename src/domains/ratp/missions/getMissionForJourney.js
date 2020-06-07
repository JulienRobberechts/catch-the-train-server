const {
  importMissionsCodes,
  importMissionsSchedules,
} = require("./dataAccess");
const {
  formatMissionsSchedules,
  calculateMissionsForJourney,
} = require("./missionSchedule");

const getMissionsSchedules = function getMissionsSchedules() {
  const missionsCodes = importMissionsCodes();
  const missionsSchedules = importMissionsSchedules(missionsCodes);
  return formatMissionsSchedules(missionsSchedules);
};

const getMissionForJourney = (
  network,
  line,
  fromStationSlug,
  toStationSlug
) => {
  if (!network || !line || !fromStationSlug || !toStationSlug) return null;

  const missionsSchedules = getMissionsSchedules();
  const missions = calculateMissionsForJourney(
    missionsSchedules,
    fromStationSlug,
    toStationSlug
  );
  return missions;
};

module.exports = getMissionForJourney;
