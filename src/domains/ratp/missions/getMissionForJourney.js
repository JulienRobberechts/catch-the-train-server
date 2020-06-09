const {
  importMissionsCodes,
  importMissionsSchedules,
} = require("./dataAccess");
const {
  formatMissionsSchedules,
  calculateMissionsForJourney,
} = require("./missionSchedule");

function onlyUnique(mission, index, sourceArray) {
  return sourceArray.findIndex((m) => m === mission) === index;
}

const getMissionsSchedules = async function getMissionsSchedules(
  getMissionDetailMethod,
  missionsCodes
) {
  const uniqueMissionsCodes = missionsCodes.filter(onlyUnique);

  const missionsSchedules = await importMissionsSchedules(
    getMissionDetailMethod,
    uniqueMissionsCodes
  );

  // console.log("missionsSchedules :>> ", missionsSchedules);
  return formatMissionsSchedules(missionsSchedules);
};

const getMissionForJourney = async (
  getMissionDetailMethod,
  network,
  line,
  fromStationSlug,
  toStationSlug,
  prospectMissions
) => {
  if (!network || !line || !fromStationSlug || !toStationSlug) return null;

  const missionsSchedules = await getMissionsSchedules(
    getMissionDetailMethod,
    prospectMissions
  );
  const missions = calculateMissionsForJourney(
    missionsSchedules,
    fromStationSlug,
    toStationSlug
  );
  return missions;
};

module.exports = getMissionForJourney;
