const { missionIsValid } = require("./mission");
const each = require("jest-each").default;

describe("missionIsValid", () => {
  each`
    network     | line    | mission        | expectedResult
    ${null}     | ${null} | ${null}        | ${false}
    ${"rers"}   | ${null} | ${null}        | ${false}
    ${"rers"}   | ${"A"}  | ${null}        | ${false}
    ${"rers"}   | ${"A"}  | ${"XXX"}       | ${false}
    ${"rers"}   | ${"A"}  | ${"Bich"}      | ${true}
    ${"rers"}   | ${"A"}  | ${"BICH"}      | ${true}
  `.it(
    "should identify '$mission' as valid: '$expectedResult'",
    ({ network, line, mission, expectedResult }) => {
      const actualResult = missionIsValid(network, line)(mission);
      expect(actualResult).toEqual(expectedResult);
    }
  );
});
