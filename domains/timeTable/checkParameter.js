const { ValidationError } = require("../../utils/errors");
const stations = require("../../tests/mock/ratp-api/data/stations");

function checkParameterStation(station) {
  if (!stations.includes(station))
    throw new ValidationError(`the station '${station}' is not recognized.`);
}

function checkParameterDestination(station, destination) {
  if (!stations.includes(destination))
    throw new ValidationError(
      `The destination '${destination}' is not recognized for the station '${station}' the api only support destination on the same train line.`
    );
}

module.exports = { checkParameterStation, checkParameterDestination };
