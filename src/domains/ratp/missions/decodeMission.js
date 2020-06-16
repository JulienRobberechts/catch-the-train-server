const MissionTypeInvalid = 0;
const MissionTypeStandard = 1;
const MissionTypeSpecialAllStations = 2;
const MissionTypeNonCommercial = 3;

const patternSpecial = /^(?<dest>[A-Z])(?<origin>[A-Z])ZZ$/;
const patternNonCommercial = /^W(?<dest>[A-Z])[WQ](?<origin>[A-Z])$/;

const patternStandard = /^(?<dest>[A-Z])(?<mission>[A-Z])[A-Z]{2}$/;

const getInvalidMission = (error) => ({
  error,
  type: MissionTypeInvalid,
});

const decodeMission = (line, missionCode) => {
  if (!line || line !== "A") return getInvalidMission("invalid line");

  if (!missionCode || missionCode.length !== 4)
    return getInvalidMission("invalid code");

  const resultSpecial = patternSpecial.exec(missionCode);
  if (resultSpecial) {
    return checkMissionTypeSpecial(
      resultSpecial.groups.dest,
      resultSpecial.groups.origin
    );
  }

  const resultNc = patternNonCommercial.exec(missionCode);
  if (resultNc) {
    return checkMissionTypeNonCommercial(
      resultNc.groups.dest,
      resultNc.groups.origin
    );
  }

  const resultStd = patternStandard.exec(missionCode);
  if (resultStd) {
    return checkMissionTypeStandard(
      resultStd.groups.dest,
      resultStd.groups.mission
    );
  }

  return getInvalidMission("code pattern not recognized");
};

const checkMissionTypeSpecial = (destination, origin) => {
  //   console.log("checkMissionTypeSpecial :>> ", { destination, origin });
  const type = MissionTypeSpecialAllStations;
  if (origin === destination)
    return getInvalidMission("origin and destination are the same");
  if (isStationLetter(destination) && isStationLetter(origin)) return { type };

  return getInvalidMission("code pattern not recognized");
};

const checkMissionTypeNonCommercial = (destination, origin) => {
  //   console.log("checkMissionTypeNonCommercial :>> ", { destination, origin });
  const type = MissionTypeNonCommercial;
  if (origin === destination)
    return getInvalidMission("origin and destination are the same");
  if (isStationLetter(destination) && isStationLetter(origin))
    return { type: type };

  return getInvalidMission("code pattern not recognized");
};

const checkMissionTypeStandard = (destination, mission) => {
  //   console.log("checkMissionTypeStandard :>> ", { destination, mission });
  const type = MissionTypeStandard;
  if (isStationLetter(destination)) return { type };

  return getInvalidMission("code pattern not recognized");
};

const missionLetter = /^[UITAZXYBGCMHSDOQSERN]$/;

const isStationLetter = (letter) => {
  return missionLetter.test(letter);
};

module.exports = {
  decodeMission,
  isStationLetter,
  MissionTypeInvalid,
  MissionTypeStandard,
  MissionTypeSpecialAllStations,
  MissionTypeNonCommercial,
};
