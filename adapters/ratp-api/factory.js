const RatpApiAdapter = require("./ratp-api-adapter");
const RatpApiAdapterMock = require("./ratp-api-adapter.mock");
let _apiAdapter, _apiAdapterMock;

exports.getRatpApiAdapter = ({ ratp_api_adapter_mock, ratpApiRootUrl }) => {
  if (ratp_api_adapter_mock) {
    if (!_apiAdapterMock) {
      _apiAdapterMock = new RatpApiAdapterMock();
    }
    return _apiAdapterMock;
  }

  if (!_apiAdapter) {
    _apiAdapter = new RatpApiAdapter({ ratpApiRootUrl });
  }
  return _apiAdapter;
};
