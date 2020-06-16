const stationsList = require("../../data/ratp/rers/A/stations.json");

const getStation = (network, line, stationSlug) => {
  if (network !== "rers") return null;
  if (line !== "A" && line !== "a") return null;
  if (!stationSlug) return null;
  const stationData = stationsList.find(
    (s) => s.slug === stationSlug.toLowerCase()
  );
  return stationData;
};

const getStationByLetterCode = (network, line, letterCode) => {
  if (network !== "rers") return null;
  if (line !== "A" && line !== "a") return null;
  if (!letterCode) return null;
  const stationData = stationsList.find(
    (s) => s.letter === letterCode.toUpperCase()
  );
  return stationData;
};

const getStationName = (network, line, stationSlug) => {
  const stationData = getStation(network, line, stationSlug);
  return stationData ? stationData.name : null;
};

module.exports = {
  getStation,
  getStationName,
  getStationByLetterCode,
};
