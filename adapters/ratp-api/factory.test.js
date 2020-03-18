const RatpApiAdapter = require("./ratp-api-adapter");
const RatpApiAdapterMock = require("./ratp-api-adapter.mock");

describe("ratp-api adapter factory", () => {
  it("should return the normal adapter", async () => {
    const factory1 = require("./factory");
    const adapter = factory1.getRatpApiAdapter({
      RATP_API_MOCK_DATA: false,
      RATP_API_ROOT_URL: "http://target.url"
    });
    expect(adapter).toBeInstanceOf(RatpApiAdapter);
  });
  it("should return the mock adapter", async () => {
    const factory = require("./factory");
    const adapter = factory.getRatpApiAdapter({ RATP_API_MOCK_DATA: true });
    expect(adapter).toBeInstanceOf(RatpApiAdapterMock);
  });
});
