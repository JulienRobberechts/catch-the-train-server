const routesByMissions = missions => departure =>
  !missions || missions.includes(departure.code);

module.exports = {
  routesByMissions
};
