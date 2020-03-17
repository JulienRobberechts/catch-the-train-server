const { ValidationError } = require("../../utils/errors");
const stations = require("../../tests/mock/ratp-api/data/stations");

function checkParameterStation(parameterStation) {
  if (!stations.includes(parameterStation))
    throw new ValidationError(
      `the station '${parameterStation}' is not recognized.`
    );
}

function checkParameterDestination(parameterStation, parameterTo) {
  if (!stations.includes(parameterTo))
    throw new ValidationError(
      `The destination '${parameterTo}' is not recognized for the station '${parameterStation}' the api only support destination on the same train line.`
    );
}

module.exports = { checkParameterStation, checkParameterDestination };
