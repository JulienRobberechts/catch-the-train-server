const SchedulesController = require("./schedules");
const apiAdapterTestDouble = require("../adapters/ratp-api/ratp-api-adapter.mock");

describe("schedules controller", () => {
  let controller;
  beforeAll(() => {
    controller = new SchedulesController({
      apiAdapter: apiAdapterTestDouble
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
  it("should return schedules for a station/to", async () => {
    const type = "rers";
    const line = "A";
    const station = "chatelet+les+halles";
    const result = await controller.getSchedulesForJourney(type, line, station);
    expect(result).toMatchSnapshot();
  });
});
