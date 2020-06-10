const SchedulesController = require("./schedules");
const {
  schedulesRepositoryMocked,
  missionsRepositoryMocked,
} = require("../adapters/ratp-api");
describe("schedules controller", () => {
  let controller;
  beforeAll(() => {
    controller = new SchedulesController({
      schedulesRepository: schedulesRepositoryMocked,
      missionsRepository: missionsRepositoryMocked,
    });
  });

  it("should not accept null parameter", async () => {
    const invalidControllerInit = () => new SchedulesController();
    expect(invalidControllerInit).toThrow();
  });
  it("should not accept empty parameter", async () => {
    const invalidControllerInit = () => new SchedulesController({});
    expect(invalidControllerInit).toThrow();
  });
  it("should not accept null api schedulesRepository", async () => {
    const invalidControllerInit = () =>
      new SchedulesController({
        schedulesRepository: null,
        missionsRepository: {},
      });
    expect(invalidControllerInit).toThrow();
  });
  it("should not accept null api missionsRepository", async () => {
    const invalidControllerInit = () =>
      new SchedulesController({
        schedulesRepository: {},
        missionsRepository: null,
      });
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
