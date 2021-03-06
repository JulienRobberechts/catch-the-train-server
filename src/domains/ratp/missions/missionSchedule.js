function calculateMissionsForJourney(
  missionsSchedules,
  departureStation,
  arrivalStation
) {
  const missions = missionsSchedules
    .map(addStationIndexToSchedule(departureStation, "departureStationIndex"))
    .filter((schedule) => schedule.departureStationIndex >= 0)
    .map(addStationIndexToSchedule(arrivalStation, "arrivalStationIndex"))
    .filter((schedule) => schedule.arrivalStationIndex >= 0)
    .filter(
      (schedule) =>
        schedule.arrivalStationIndex >= schedule.departureStationIndex
    )
    .map((schedule) => schedule.mission);

  return missions;
}

const addStationIndexToSchedule = (station, indexPropName) => ({
  stations,
  ...otherProps
}) => ({
  [indexPropName]: stations.findIndex((s) => s === station),
  stations,
  ...otherProps,
});

module.exports = {
  calculateMissionsForJourney,
  addStationIndexToSchedule,
};
