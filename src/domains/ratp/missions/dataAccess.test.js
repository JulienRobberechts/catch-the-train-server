const {
  importMissionsCodes,
  importMissionsSchedules,
} = require("./dataAccess");

describe("dataAccess", () => {
  describe("importMissionsCodes", () => {
    test("should import Missions codes", () => {
      const missionCodes = importMissionsCodes();
      expect(missionCodes).toMatchSnapshot();
    });
  });
  describe("importMissionsSchedules", () => {
    test("should import Missions Schedules", () => {
      const missionCodes = ["NANI", "NOTE"];
      const missionsSchedules = importMissionsSchedules(missionCodes);
      expect(missionsSchedules).toMatchSnapshot();
    });
  });
});
