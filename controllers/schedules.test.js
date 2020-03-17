const SchedulesController = require("./schedules");
const RatpApiAdapter = require("../adapters/ratp-api-adapter.mock");

describe("schedules controller", () => {
  let controller;
  beforeAll(() => {
    controller = new SchedulesController({
      apiAdapter: new RatpApiAdapter()
    });
  });

  it("should not accept null api adapter part 1", async () => {
    const invalidControllerInit = () => new SchedulesController();
    expect(invalidControllerInit).toThrow();
  });
  it("should not accept null api adapter part 2", async () => {
    const invalidControllerInit = () => new SchedulesController({});
    expect(invalidControllerInit).toThrow();
  });
  it("should not accept null api adapter part 3", async () => {
    const invalidControllerInit = () =>
      new SchedulesController({ apiAdapter: null });
    expect(invalidControllerInit).toThrow();
  });
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
