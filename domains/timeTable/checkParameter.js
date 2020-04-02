const { ValidationError } = require("../../utils/errors");
const stations = require("../../tests/mock/ratp-api/data/stations");

function checkParameterType(type) {
  if (type !== "rers")
    throw new ValidationError(`the type '${station}' is not recognized.`);
}

function checkParameterLine(type, line) {
  if (line !== "A")
    throw new ValidationError(`the line '${line}' is not recognized.`);
}

function checkParameterStation(type, line, station) {
  // if (!stations.includes(station))
  if (station !== "chatelet+les+halles")
    throw new ValidationError(`the station '${station}' is not recognized.`);
}

module.exports = {
  checkParameterType,
  checkParameterLine,
  checkParameterStation
};
