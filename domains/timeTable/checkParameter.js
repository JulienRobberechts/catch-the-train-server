const { ValidationError } = require("../../utils/errors");
const stations = require("../../data/ratp/rers/A/stations");

function checkParameterType(type) {
  if (type !== "rers")
    throw new ValidationError(`the type '${station}' is not recognized.`);
}

function checkParameterLine(type, line) {
  if (line !== "A")
    throw new ValidationError(`the line '${line}' is not recognized.`);
}

function checkParameterStation(type, line, station) {
  if (!type || !line || !station) {
    throw new ValidationError(
      `the station '${type}/${line}/${station}' is not recognized.`
    );
  }
  if (!stations.find(s => s.slug === station.toLowerCase())) {
    throw new ValidationError(
      `the station '${type}/${line}/${station}' is not recognized.`
    );
  }
}

module.exports = {
  checkParameterType,
  checkParameterLine,
  checkParameterStation
};
