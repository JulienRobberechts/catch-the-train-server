const MissionTypeInvalid = 0;
const MissionTypeStandard = 1;
const MissionTypeSpecialAllStations = 2;
const MissionTypeNonCommercial = 3;

const patternSpecial = /^(?<dest>[A-Z])(?<origin>[A-Z])ZZ$/;
const patternNonCommercial = /^W(?<dest>[A-Z])[WQ](?<origin>[A-Z])$/;

const patternStandard = /^(?<dest>[A-Z])(?<mission>[A-Z])[A-Z]{2}$/;

const getMissionType = (line, missionCode) => {
  if (!line || line !== "A") return MissionTypeInvalid;

  if (!missionCode || missionCode.length !== 4) return MissionTypeInvalid;

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

  return MissionTypeInvalid;
};

const checkMissionTypeSpecial = (destination, origin) => {
  //   console.log("checkMissionTypeSpecial :>> ", { destination, origin });
  if (origin === destination) return MissionTypeInvalid;
  if (isStationLetter(destination) && isStationLetter(origin))
    return MissionTypeSpecialAllStations;

  return MissionTypeInvalid;
};

const checkMissionTypeNonCommercial = (destination, origin) => {
  //   console.log("checkMissionTypeNonCommercial :>> ", { destination, origin });

  if (origin === destination) return MissionTypeInvalid;
  if (isStationLetter(destination) && isStationLetter(origin))
    return MissionTypeNonCommercial;

  return MissionTypeInvalid;
};

const checkMissionTypeStandard = (destination, mission) => {
  //   console.log("checkMissionTypeStandard :>> ", { destination, mission });

  if (isStationLetter(destination)) return MissionTypeStandard;

  return MissionTypeInvalid;
};

const missionLetter = /^[UITAZXYBGCMHSDOQSERN]$/;

const isStationLetter = (letter) => {
  return missionLetter.test(letter);
};

module.exports = {
  getMissionType,
  isStationLetter,
  MissionTypeInvalid,
  MissionTypeStandard,
  MissionTypeSpecialAllStations,
  MissionTypeNonCommercial,
};
