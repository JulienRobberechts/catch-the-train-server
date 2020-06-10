const getMissionsFromSchedule = (schedule) => {
  const missions = schedule.result.schedules
    .map((departure) => (departure.code ? departure.code.toUpperCase() : null))
    .filter((mission) => !!mission)
    .filter(uniqueMission);

  return missions;
};

function uniqueMission(mission, index, sourceArray) {
  return sourceArray.findIndex((m) => m === mission) === index;
}

module.exports = getMissionsFromSchedule;
