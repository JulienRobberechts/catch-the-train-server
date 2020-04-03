const { ValidationError } = require("../../utils/errors");
const stations = require("../../data/ratp/rers/A/stations");

function checkParameterType(type) {
  if (!type || type.toLowerCase() !== "rers")
    throw new ValidationError(`the type '${type}' is not recognized.`);
}

function checkParameterLine(type, line) {
  if (!type || !line || line.toLowerCase() !== "a")
    throw new ValidationError(`the line '${type}/${line}' is not recognized.`);
}

function checkParameterStation(type, line, station) {
  if (
    !type ||
    !line ||
    !station ||
    !stations.find(s => s.slug === station.toLowerCase())
  )
    throw new ValidationError(
      `the station '${type}/${line}/${station}' is not recognized.`
    );
}

module.exports = {
  checkParameterType,
  checkParameterLine,
  checkParameterStation
};
