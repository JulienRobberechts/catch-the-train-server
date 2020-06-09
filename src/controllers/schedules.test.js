const SchedulesController = require("./schedules");
const apiAdapterFactory = require("../adapters/ratp-api/factory");

describe("schedules controller", () => {
  let controller;
  beforeAll(() => {
    controller = new SchedulesController({
      apiAdapter: apiAdapterFactory.getRatpApiAdapter({
        RATP_API_MOCK_DATA: true,
      }),
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
  it("should return schedules", async () => {
    const network = "rers";
    const line = "A";
    const fromStationSlug = "chatelet+les+halles";
    const toStationSlug = "maisons+laffitte";
    const result = await controller.getSchedulesForJourneyByDestination(
      network,
      line,
      fromStationSlug,
      toStationSlug
    );
    expect(result).toMatchSnapshot();
  });
});
