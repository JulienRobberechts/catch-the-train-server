const { getStationByLetterCode } = require("../getStation");

function getMissionWay(network, line, originLetter, destinationLetter) {
  if (!originLetter || !destinationLetter) return null;
  if (originLetter === destinationLetter) return null;

  const origin = getStationByLetterCode(network, line, originLetter);
  const destination = getStationByLetterCode(network, line, destinationLetter);

  if (!origin || !destination) return null;

  if (origin.order === destination.order) return null;

  return origin.order < destination.order ? "forward" : "backward";
}

module.exports = {
  getMissionWay,
};
