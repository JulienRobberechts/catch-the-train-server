const SchedulesController = require("./schedules");
const apiAdapter = require("../adapters/ratp-api-adapter.mock");
const controller = new SchedulesController({ apiAdapter });

describe("schedules controller", () => {
  it("should return all schedules", async () => {
    const result = await controller.getAllSchedules();
    expect(result).toMatchSnapshot();
  });
  it("should return schedules for a station", async () => {
    const station = "saint-germain-en-laye";
    const result = await controller.getSchedulesForStation(station);
    expect(result).toMatchSnapshot();
  });
  it("should return schedules for a station/to", async () => {
    const station = "saint-germain-en-laye";
    const to = "nation";
    const result = await controller.getSchedulesForJourney(station, to);
    expect(result).toMatchSnapshot();
  });
});
