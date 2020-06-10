const getMissionsFromSchedule = require("./getMissionsFromSchedule");
const each = require("jest-each").default;

describe("getMissionsFromSchedule", () => {
  const testCase1 = {
    schedule: {
      result: {
        schedules: [
          {
            code: "A",
          },
          {
            code: "B",
          },
        ],
      },
    },
    expectedMissions: ["A", "B"],
  };
  const testCase2 = {
    schedule: {
      result: {
        schedules: [
          {
            code: "a",
          },
          {
            code: "b",
          },
        ],
      },
    },
    expectedMissions: ["A", "B"],
  };
  const testCase3 = {
    schedule: {
      result: {
        schedules: [
          {
            code: "A",
          },
          {
            code: "B",
          },
          {
            code: "A",
          },
        ],
      },
    },
    expectedMissions: ["A", "B"],
  };
  const testCase4 = {
    schedule: {
      result: {
        schedules: [
          {
            code: "",
          },
          {
            code: "A",
          },
          {
            code: null,
          },
          {
            code: undefined,
          },
        ],
      },
    },
    expectedMissions: ["A"],
  };
  each([
    ["happy path", testCase1],
    ["lower case", testCase2],
    ["repetition", testCase3],
    ["empty values", testCase4],
  ]).it(
    "%# - should extract missions from RATP schedule - %s",
    (_testTitle, { schedule, expectedMissions }) => {
      const actualResult = getMissionsFromSchedule(schedule);
      expect(actualResult).toEqual(expectedMissions);
    }
  );
});
