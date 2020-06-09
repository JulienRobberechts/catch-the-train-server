const { RATP_API_ROOT_URL } = require("../../../config");

async function getSchedulesForMissions(getMissionDetailMethod, missionCodes) {
  return Promise.all(
    missionCodes.map(getSchedulesForAMission(getMissionDetailMethod))
  );
}

const getSchedulesForAMission = (getMissionDetailMethod) => async (mission) => {
  const rawSchedule = await getMissionDetailMethod({
    RATP_API_ROOT_URL,
    missionCode: mission,
  });
  return formatSchedule(mission, rawSchedule);
};

const formatSchedule = (mission, rawSchedule) => ({
  mission,
  stations: rawSchedule.result.stations.map((station) => station.slug),
});

module.exports = {
  getSchedulesForMissions,
};
