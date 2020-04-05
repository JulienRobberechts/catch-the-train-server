const stationsList = require("../../data/ratp/rers/A/stations.json");

exports.getStationName = (network, line, stationSlug) => {
  if (network !== "rers") return null;
  if (line !== "A" && line !== "a") return null;
  if (!stationSlug) return null;
  const stationData = stationsList.find(
    (s) => s.slug === stationSlug.toLowerCase()
  );
  return stationData ? stationData.name : null;
};
