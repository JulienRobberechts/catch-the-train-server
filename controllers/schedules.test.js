const controller = require("./controller");
const apiAdapter = require("../adapters/openEventApi.mock");
const eventsController = new controller({ apiAdapter });

describe("events controller", () => {
  it("should return all events", async () => {
    const result = await eventsController.getEvents({});
    expect(result).toMatchSnapshot();
  });
  it("should return events of type Music", async () => {
    const result = await eventsController.getEvents({ type: "Music" });
    expect(result).toMatchSnapshot();
  });
  it("should return events of type Experience", async () => {
    const result = await eventsController.getEvents({
      type: "Experience"
    });
    expect(result).toMatchSnapshot();
  });
  it("should return no events of type unknown", async () => {
    const result = await eventsController.getEvents({
      type: "UnknownType"
    });
    expect(result).toEqual([]);
  });
  it("should return events in the US", async () => {
    const result = await eventsController.getEvents({
      countryCode: "USA"
    });
    expect(result).toMatchSnapshot();
  });
});
