const { getSchedulesForMissions } = require("./dataAccess");

const {
  getMissionDetailMocked,
} = require("../../../adapters/ratp-api/factory");

describe("dataAccess", () => {
  describe("getSchedulesForMissions", () => {
    test("should import Missions Schedules", async () => {
      const missionCodes = ["NANI", "NOTE"];
      const missionsSchedules = await getSchedulesForMissions(
        getMissionDetailMocked,
        missionCodes
      );
      expect(missionsSchedules).toMatchSnapshot();
    });
  });
});
