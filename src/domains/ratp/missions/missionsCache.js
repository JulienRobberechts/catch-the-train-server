const NodeCache = require("node-cache");
const missionsCache = new NodeCache({
  checkperiod: 0,
  useClones: false,
  maxKeys: 1000,
});

const {
  getSchedulesForAMission: getSchedulesForAMissionFromRepository,
} = require("./missionsServices");

const getSchedulesForAMission = (missionsRepository) => async (missionCode) => {
  const valueFromCache = missionsCache.get(missionCode);
  if (valueFromCache) {
    return valueFromCache;
  }

  const valueFromApi = await getSchedulesForAMissionFromRepository(
    missionsRepository
  )(missionCode);
  missionsCache.set(missionCode, valueFromApi);
  return valueFromApi;
};

module.exports = {
  getSchedulesForAMission,
};
