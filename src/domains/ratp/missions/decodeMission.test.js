const {
  decodeMission,
  MissionTypeInvalid,
  MissionTypeStandard,
  MissionTypeSpecialAllStations,
  MissionTypeNonCommercial,
} = require("./decodeMission");
const each = require("jest-each").default;

describe("decodeMission", () => {
  each`
    line    | missionCode            | expectedMissionType
    ${null} | ${null}                | ${MissionTypeInvalid}
    ${"F"}  | ${"BBTO"}              | ${MissionTypeInvalid}
    ${"A"}  | ${"BBto"}              | ${MissionTypeInvalid}
    ${"A"}  | ${"BBT"}               | ${MissionTypeInvalid}
    ${"A"}  | ${"BBTO"}              | ${MissionTypeStandard}
    ${"A"}  | ${"BICH"}              | ${MissionTypeStandard}
    ${"A"}  | ${"NANI"}              | ${MissionTypeStandard}
    ${"A"}  | ${"NATO"}              | ${MissionTypeStandard}
    ${"A"}  | ${"QURI"}              | ${MissionTypeStandard}
    ${"A"}  | ${"null"}              | ${MissionTypeInvalid}
    ${"A"}  | ${"NANI"}              | ${MissionTypeStandard}
    ${"A"}  | ${"YOZZ"}              | ${MissionTypeSpecialAllStations}
    ${"A"}  | ${"TOZZ"}              | ${MissionTypeSpecialAllStations}
    ${"A"}  | ${"BNZZ"}              | ${MissionTypeSpecialAllStations}
    ${"A"}  | ${"SSZZ"}              | ${MissionTypeInvalid}
    ${"A"}  | ${"WYWZ"}              | ${MissionTypeNonCommercial}
    ${"A"}  | ${"WNWB"}              | ${MissionTypeNonCommercial}
    ${"A"}  | ${"WNQB"}              | ${MissionTypeNonCommercial}
    ${"A"}  | ${"WBWN"}              | ${MissionTypeNonCommercial}
    ${"A"}  | ${"WWWN"}              | ${MissionTypeInvalid}
  `.it(
    "should return mission type '$expectedMissionType' for mission '$missionCode'",
    async ({ line, missionCode, expectedMissionType }) => {
      const actualResult = await decodeMission(line, missionCode);
      expect(actualResult).toEqual(expectedMissionType);
    }
  );
});
