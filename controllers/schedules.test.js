const SchedulesController = require("./schedules");
const apiAdapter = require("../adapters/ratp-api-adapter.mock");
const controller = new SchedulesController({ apiAdapter });

describe("schedules controller", () => {
  it("should return all schedules", async () => {
    const result = await controller.getSchedules({});
    expect(result).toMatchSnapshot();
  });
  it("should return schedules for a station", async () => {
    const result = await controller.getSchedules({ station: "sgl" });
    expect(result).toMatchSnapshot();
  });
  it("should return schedules for a station/to", async () => {
    const result = await controller.getSchedules({ station: "sgl", to: "" });
    expect(result).toMatchSnapshot();
  });
});
