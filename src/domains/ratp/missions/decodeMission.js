const { getStationByLetterCode } = require("../getStation");
const { getMissionWay } = require("./getMissionWay");

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

const decodeMission = (line) => (missionCode) => {
  const missionDetails = decodeMission2(line, missionCode);
  const way = getMissionWay(missionDetails);
  return { missionCode, ...missionDetails, way };
};

const decodeMission2 = (line, missionCode) => {
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

const checkMissionTypeSpecial = (destLetter, originLetter) => {
  //   console.log("checkMissionTypeSpecial :>> ", { destination, origin });
  const type = MissionTypeSpecialAllStations;
  if (originLetter === destLetter)
    return getInvalidMission("origin and destination are the same");
  const origin = getStationByLetterCode("rers", "A", originLetter);
  const destination = getStationByLetterCode("rers", "A", destLetter);
  if (origin && destination) return { type, origin, destination };

  return getInvalidMission("code pattern not recognized");
};

const checkMissionTypeNonCommercial = (destLetter, originLetter) => {
  //   console.log("checkMissionTypeNonCommercial :>> ", { destination, origin });
  const type = MissionTypeNonCommercial;
  if (originLetter === destLetter)
    return getInvalidMission("origin and destination are the same");
  const origin = getStationByLetterCode("rers", "A", originLetter);
  const destination = getStationByLetterCode("rers", "A", destLetter);
  if (origin && destination) return { type, origin, destination };

  return getInvalidMission("code pattern not recognized");
};

const checkMissionTypeStandard = (destLetter, missionLetter) => {
  //   console.log("checkMissionTypeStandard :>> ", { destination, mission });
  const type = MissionTypeStandard;
  const destination = getStationByLetterCode("rers", "A", destLetter);
  if (destination) return { type, destination };

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
