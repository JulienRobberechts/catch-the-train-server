const NodeCache = require("node-cache");
const missionsCache = new NodeCache({
  checkperiod: 0,
  useClones: false,
  maxKeys: 1000,
});

const {
  getSchedulesForAMission: getSchedulesForAMissionFromRepository,
} = require("./missionsRepository");

const getSchedulesForAMission = (getMissionDetailMethod) => async (mission) => {
  const valueFromCache = missionsCache.get(mission);
  if (valueFromCache) {
    return valueFromCache;
  }

  const valueFromApi = await getSchedulesForAMissionFromRepository(
    getMissionDetailMethod
  )(mission);
  missionsCache.set(mission, valueFromApi);
  return valueFromApi;
};

module.exports = {
  getSchedulesForAMission,
};
