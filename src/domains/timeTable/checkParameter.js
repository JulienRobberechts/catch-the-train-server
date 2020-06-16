const { ValidationError } = require("../../utils/errors");
const { getStation } = require("../../domains/ratp/getStation");

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
  if (!network || !line || !station || !getStation(network, line, station))
    throw new ValidationError(
      `the station '${network}/${line}/${station}' is not recognized.`
    );
}

module.exports = {
  checkParameterNetwork,
  checkParameterLine,
  checkParameterStation,
};
