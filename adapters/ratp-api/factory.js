const RatpApiAdapter = require("./ratp-api-adapter");
const RatpApiAdapterMock = require("./ratp-api-adapter.mock");
let _apiAdapter, _apiAdapterMock;

exports.getRatpApiAdapter = ({ RATP_API_MOCK_DATA, RATP_API_ROOT_URL }) => {
  if (RATP_API_MOCK_DATA) {
    if (!_apiAdapterMock) {
      _apiAdapterMock = new RatpApiAdapterMock();
    }
    return _apiAdapterMock;
  }

  if (!_apiAdapter) {
    _apiAdapter = new RatpApiAdapter({ RATP_API_ROOT_URL });
  }
  return _apiAdapter;
};
