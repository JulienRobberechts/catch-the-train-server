const { ValidationError } = require("../../utils/errors");
const stations = require("../../data/ratp/rers/A/stations");
const allMissionsRerA = require("../../data/ratp/rers/A/missions.json");

function checkParameterNetwork(network) {
  if (!network || network.toLowerCase() !== "rers")
    throw new ValidationError(`the network '${network}' is not recognized.`);
}

function checkParameterLine(network, line) {
  if (!network || !line || line.toLowerCase() !== "a")
    throw new ValidationError(
      `the line '${network}/${line}' is not recognized.`
    );
}

function checkParameterStation(network, line, station) {
  if (
    !network ||
    !line ||
    !station ||
    !stations.find((s) => s.slug === station.toLowerCase())
  )
    throw new ValidationError(
      `the station '${network}/${line}/${station}' is not recognized.`
    );
}

function checkParameterMissions(network, line, missions) {
  if (!network || !line)
    throw new ValidationError(
      `the network and line is not recognized: ${network}/${line}.`
    );

  if (missions && !missions.every(missionIsValid))
    throw new ValidationError(
      `one of the missions '${missions}' is not recognized (${network}/${line}).`
    );
}

function missionIsValid(mission) {
  return allMissionsRerA.find((m) => m === mission.toUpperCase());
}

module.exports = {
  checkParameterNetwork,
  checkParameterLine,
  checkParameterStation,
  checkParameterMissions,
  missionIsValid,
};
