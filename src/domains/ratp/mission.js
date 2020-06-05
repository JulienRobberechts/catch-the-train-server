const allMissionsRerA = require("../../data/ratp/rers/A/missions.json");

function missionIsValid(network, line) {
  if (!network || !line) return (_mission) => false;
  return (mission) =>
    !!(mission && allMissionsRerA.find((m) => m === mission.toUpperCase()));
}

module.exports = { missionIsValid };
