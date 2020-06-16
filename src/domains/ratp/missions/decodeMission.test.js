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
    line    | missionCode            | dest           | expectedMissionType
    ${null} | ${null}                | ${undefined}   | ${MissionTypeInvalid}
    ${"F"}  | ${"BBTO"}              | ${undefined}   | ${MissionTypeInvalid}
    ${"A"}  | ${"BBto"}              | ${undefined}   | ${MissionTypeInvalid}
    ${"A"}  | ${"BBT"}               | ${undefined}   | ${MissionTypeInvalid}
    ${"A"}  | ${"BBTO"}              | ${"B"}         | ${MissionTypeStandard}
    ${"A"}  | ${"BICH"}              | ${"B"}         | ${MissionTypeStandard}
    ${"A"}  | ${"NANI"}              | ${"N"}         | ${MissionTypeStandard}
    ${"A"}  | ${"NATO"}              | ${"N"}         | ${MissionTypeStandard}
    ${"A"}  | ${"QURI"}              | ${"Q"}         | ${MissionTypeStandard}
    ${"A"}  | ${"null"}              | ${undefined}   | ${MissionTypeInvalid}
    ${"A"}  | ${"NANI"}              | ${"N"}         | ${MissionTypeStandard}
    ${"A"}  | ${"YOZZ"}              | ${"Y"}         | ${MissionTypeSpecialAllStations}
    ${"A"}  | ${"TOZZ"}              | ${"T"}         | ${MissionTypeSpecialAllStations}
    ${"A"}  | ${"BNZZ"}              | ${"B"}         | ${MissionTypeSpecialAllStations}
    ${"A"}  | ${"SSZZ"}              | ${undefined}   | ${MissionTypeInvalid}
    ${"A"}  | ${"WYWZ"}              | ${"Y"}         | ${MissionTypeNonCommercial}
    ${"A"}  | ${"WNWB"}              | ${"N"}         | ${MissionTypeNonCommercial}
    ${"A"}  | ${"WNQB"}              | ${"N"}         | ${MissionTypeNonCommercial}
    ${"A"}  | ${"WBWN"}              | ${"B"}         | ${MissionTypeNonCommercial}
    ${"A"}  | ${"WWWN"}              | ${undefined}   | ${MissionTypeInvalid}
  `.it(
    "should return mission type '$expectedMissionType' for mission '$missionCode'",
    async ({ line, missionCode, dest, expectedMissionType }) => {
      const actualResult = await decodeMission(line, missionCode);
      expect(actualResult.type).toEqual(expectedMissionType);
      if (actualResult.destination) {
        expect(actualResult.destination.letter).toEqual(dest);
      } else {
        expect(actualResult.destination).toEqual(undefined);
      }
    }
  );
});
