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
  const testCase5 = {
    departures: [
      {
        mission: "A",
        noPassenger: true,
      },
      {
        mission: "C",
        noPassenger: true,
      },
      {
        mission: "B",
      },
      {
        mission: "C",
      },
    ],
    expectedMissions: ["B", "C"],
  };
  const testCase6 = {
    departures: [
      {
        mission: "A",
        isTerminus: true,
      },
      {
        mission: "C",
        isTerminus: true,
      },
      {
        mission: "B",
      },
      {
        mission: "C",
      },
    ],
    expectedMissions: ["B", "C"],
  };
  each([
    ["happy path", testCase1],
    ["repetition", testCase3],
    ["empty values", testCase4],
    ["no noPassenger", testCase5],
    ["no isTerminus", testCase6],
  ]).it(
    "%# - should extract missions from RATP schedule - %s",
    (_testTitle, { departures, expectedMissions }) => {
      const actualResult = getMissionsFromSchedule(departures);
      expect(actualResult).toEqual(expectedMissions);
    }
  );
});
