const {
  importMissionsCodes,
  importMissionsSchedules,
} = require("./dataAccess");

const {
  getMissionDetailMocked,
} = require("../../../adapters/ratp-api/factory");

describe("dataAccess", () => {
  describe("importMissionsCodes", () => {
    test("should import Missions codes", () => {
      const missionCodes = importMissionsCodes();
      expect(missionCodes).toMatchSnapshot();
    });
  });
  describe("importMissionsSchedules", () => {
    test("should import Missions Schedules", async () => {
      const missionCodes = ["NANI", "NOTE"];
      const missionsSchedules = await importMissionsSchedules(
        getMissionDetailMocked,
        missionCodes
      );
      expect(missionsSchedules).toMatchSnapshot();
    });
  });
});
