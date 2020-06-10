const getMissionsFromSchedule = require("./getMissionsFromSchedule");
const each = require("jest-each").default;

describe("getMissionsFromSchedule", () => {
  const testCase1 = {
    departures: [
      {
        mission: "A",
      },
      {
        mission: "B",
      },
    ],
    expectedMissions: ["A", "B"],
  };
  const testCase3 = {
    departures: [
      {
        mission: "A",
      },
      {
        mission: "B",
      },
      {
        mission: "A",
      },
    ],
    expectedMissions: ["A", "B"],
  };
  const testCase4 = {
    departures: [
      {
        mission: "",
      },
      {
        mission: "A",
      },
      {
        mission: null,
      },
      {
        mission: undefined,
      },
    ],
    expectedMissions: ["A"],
  };
  each([
    ["happy path", testCase1],
    ["repetition", testCase3],
    ["empty values", testCase4],
  ]).it(
    "%# - should extract missions from RATP schedule - %s",
    (_testTitle, { departures, expectedMissions }) => {
      const actualResult = getMissionsFromSchedule(departures);
      expect(actualResult).toEqual(expectedMissions);
    }
  );
});
