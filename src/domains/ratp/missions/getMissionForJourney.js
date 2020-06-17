const { getSchedulesForAMission } = require("./missionsCache");
const { calculateMissionsForJourney } = require("./missionSchedule");
const {
  MissionTypeInvalid,
  MissionTypeStandard,
  MissionTypeSpecialAllStations,
  MissionTypeNonCommercial,
} = require("./decodeMission");

const missionsOfType = (missions) => (typeForFilter) => {
  return missions.filter((m) => m.type === typeForFilter);
};

async function getSchedulesForMissions(missionsRepository, allMissions) {
  const missions = missionsOfType(allMissions);

  if (missions(MissionTypeInvalid).length > 0)
    throw Error(
      "The mission list contains invalid missions!",
      missions(MissionTypeInvalid)
    );

  if (missions(MissionTypeNonCommercial).length > 0)
    throw Error(
      "The mission list contains non commercial missions!",
      missions(MissionTypeNonCommercial)
    );

  const schedulesStandard = await getSchedulesForMissionsStandard(
    missionsRepository,
    missions(MissionTypeStandard)
  );

  const schedulesSpecial = getSchedulesForMissionsSpecial(
    missions(MissionTypeSpecialAllStations)
  );

  return [...schedulesStandard, ...schedulesSpecial];
}

async function getSchedulesForMissionsStandard(
  missionsRepository,
  missionsStandard
) {
  return Promise.all(
    missionsStandard.map((m) => {
      return getSchedulesForAMission(missionsRepository)(m.missionCode);
    })
  );
}

function getSchedulesForMissionsSpecial(missionsSpecial) {
  return [];
}

module.exports = { getSchedulesForMissions };
