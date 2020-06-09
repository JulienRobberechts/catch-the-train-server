const { getSchedulesForMissions } = require("./missionsRepository");

const {
  getMissionDetailMocked,
} = require("../../../adapters/ratp-api/factory");

describe("missionsRepository", () => {
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
