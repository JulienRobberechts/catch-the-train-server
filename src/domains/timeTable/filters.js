const routesByMissions = (missions) => (departure) =>
  !missions || missions.includes(departure.code.toUpperCase());

module.exports = {
  routesByMissions,
};
