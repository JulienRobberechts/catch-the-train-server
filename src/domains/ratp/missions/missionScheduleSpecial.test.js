const { getSchedulesForASpecialMission } = require("./missionScheduleSpecial");
const each = require("jest-each").default;

const stationsYOZZ = ["a", "b", "c"];
const stationsTOZZ = ["c", "b", "a"];
const stationsBNZZ = ["c", "b", "a"];

const missions = [
  ["YOZZ", stationsYOZZ],
  ["TOZZ", stationsTOZZ],
];

describe("Missions schedule Special", () => {
  describe("getSchedulesForASpecialMission", () => {
    each(missions).test(
      "should return schedule for mission %s",
      (missionCode, expectedStations) => {
        const actualResult = getSchedulesForASpecialMission(missionCode);
        expect(actualResult.mission).toBe(missionCode);
        expect(actualResult.stations).toEqual(expectedStations);
      }
    );
  });
});
