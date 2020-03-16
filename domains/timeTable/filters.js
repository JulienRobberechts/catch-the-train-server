const routesByDepartureStation = station => route =>
  !station || route.station.code === station;

const routesByDestination = destination => route =>
  !destination || route.destinations.includes(destination);

module.exports = {
  routesByDepartureStation,
  routesByDestination
};
