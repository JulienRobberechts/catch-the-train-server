const NodeCache = require("node-cache");
const missionsCache = new NodeCache({
  checkperiod: 0,
  useClones: false,
  maxKeys: 1000,
});

const {
  getSchedulesForAStandardMission: getSchedulesForAStandardMissionFromRepository,
} = require("./missionsServices");

const getSchedulesForAStandardMission = (missionsRepository) => async (
  missionCode
) => {
  const valueFromCache = missionsCache.get(missionCode);
  if (valueFromCache) {
    return valueFromCache;
  }

  const valueFromApi = await getSchedulesForAStandardMissionFromRepository(
    missionsRepository
  )(missionCode);
  missionsCache.set(missionCode, valueFromApi);
  return valueFromApi;
};

module.exports = {
  getSchedulesForAStandardMission,
};
