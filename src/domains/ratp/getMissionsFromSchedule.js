const getMissionsFromSchedule = (departures) => {
  const missions = departures
    .filter((departure) => !departure.noPassenger)
    .filter((departure) => !departure.isTerminus)
    .map((departure) => departure.mission)
    .filter((mission) => !!mission)
    .filter(uniqueMission);

  return missions;
};

function uniqueMission(mission, index, sourceArray) {
  return sourceArray.findIndex((m) => m === mission) === index;
}

module.exports = getMissionsFromSchedule;
