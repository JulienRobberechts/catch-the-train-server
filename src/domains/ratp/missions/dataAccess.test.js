const { importMissionsSchedules } = require("./dataAccess");

const {
  getMissionDetailMocked,
} = require("../../../adapters/ratp-api/factory");

describe("dataAccess", () => {
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
