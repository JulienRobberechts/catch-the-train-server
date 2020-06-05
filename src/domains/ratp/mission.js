const allMissionsRerA = require("../../data/ratp/rers/A/missions.json");

function missionIsValid(network, line) {
  if (!network || !line) return (_mission) => false;
  return (mission) =>
    !!(mission && allMissionsRerA.find((m) => m === mission.toUpperCase()));
}

const displayUnknownMissionsCodes = (network, line, departures) => {
  try {
    if (!departures) return;

    const unknownMissions = departures
      .filter((departure) => !departure.noPassenger)
      .map((departure) => departure.mission)
      .filter(uniqueItem)
      .filter((m) => !missionIsValid(network, line)(m));

    if (unknownMissions.length > 0) {
      console.warn("Unknown Missions", { unknownMissions });
    }
  } catch (error) {
    console.warn("error in checkMissionsCodes", error);
  }
};

const uniqueItem = (value, index, array) => array.indexOf(value) === index;

module.exports = { missionIsValid, displayUnknownMissionsCodes };
