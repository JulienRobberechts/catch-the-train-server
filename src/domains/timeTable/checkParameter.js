const { ValidationError } = require("../../utils/errors");
const { missionIsValid } = require("../ratp/mission");
const stations = require("../../data/ratp/rers/A/stations");

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

  if (missions && !missions.every(missionIsValid(network, line)))
    throw new ValidationError(
      `one of the missions '${missions}' is not recognized (${network}/${line}).`
    );
}

module.exports = {
  checkParameterNetwork,
  checkParameterLine,
  checkParameterStation,
  checkParameterMissions,
};
