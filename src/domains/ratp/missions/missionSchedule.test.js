const {
  calculateMissionsForJourney,
  addStationIndexToSchedule,
} = require("./missionSchedule");
const each = require("jest-each").default;

const schedule1 = {
  mission: "m1",
  stations: ["a", "b", "c"],
};

const schedule2 = {
  mission: "m2",
  stations: ["c", "b", "a"],
};
const schedule3 = {
  mission: "m3",
  stations: ["a", "b", "d"],
};
const schedules = [schedule1, schedule2, schedule3];

describe("Missions", () => {
  describe("addStationIndexToSchedule", () => {
    each([
      ["a", schedule1, 0],
      ["a", schedule2, 2],
      ["a", schedule3, 0],
    ]).test(
      "should calculate stations index for '%s' in schedule '%s'",
      (station, schedule, expectedIndex) => {
        const actualResult = addStationIndexToSchedule(
          station,
          "departureIndex"
        )(schedule);
        expect(actualResult.mission).toBeTruthy();
        expect(actualResult.stations).toBeTruthy();
        expect(actualResult.departureIndex).toEqual(expectedIndex);
      }
    );
  });
  describe("calculateMissionsForJourney", () => {
    each([
      ["a", "a", ["m1", "m2", "m3"]],
      ["a", "b", ["m1", "m3"]],
      ["a", "c", ["m1"]],
      ["a", "d", ["m3"]],
      ["b", "b", ["m1", "m2", "m3"]],
      ["b", "c", ["m1"]],
      ["b", "d", ["m3"]],
      ["c", "c", ["m1", "m2"]],
      ["c", "d", []],
      ["d", "d", ["m3"]],

      ["b", "a", ["m2"]],
      ["c", "a", ["m2"]],
      ["d", "a", []],
      ["c", "b", ["m2"]],
      ["d", "b", []],
      ["d", "c", []],
    ]).test(
      "should calculate missions from '%s' to '%s'",
      (departure, arrival, expectedMissions) => {
        const actualMissions = calculateMissionsForJourney(
          schedules,
          departure,
          arrival
        );
        expect(actualMissions).toEqual(expectedMissions);
      }
    );
  });
});
