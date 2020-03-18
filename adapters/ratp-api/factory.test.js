const RatpApiAdapter = require("./ratp-api-adapter");
const RatpApiAdapterMock = require("./ratp-api-adapter.mock");

describe("ratp-api adapter factory", () => {
  it("should return the normal adapter", async () => {
    const factory1 = require("./factory");
    const adapter = factory1.getRatpApiAdapter({
      ratp_api_adapter_mock: false,
      ratpApiRootUrl: "http://target.url"
    });
    expect(adapter).toBeInstanceOf(RatpApiAdapter);
  });
  it("should return the mock adapter", async () => {
    const factory = require("./factory");
    const adapter = factory.getRatpApiAdapter({ ratp_api_adapter_mock: true });
    expect(adapter).toBeInstanceOf(RatpApiAdapterMock);
  });
});
