const { RATP_API_ROOT_URL } = require("../../../config");

const getSchedulesForAMission = (missionsRepository) => async (mission) => {
  const rawSchedule = await missionsRepository.getMissionDetail({
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
  getSchedulesForAMission,
};
