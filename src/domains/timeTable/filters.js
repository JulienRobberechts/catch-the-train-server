const routesByRatpMissions = (missions) => (departure) =>
  !missions || missions.includes(departure.mission.toUpperCase());

module.exports = {
  routesByRatpMissions,
};
