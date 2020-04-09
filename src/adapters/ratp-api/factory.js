const RatpApiAdapter = require("./ratp-api-adapter");
const RatpApiAdapterMock = require("./ratp-api-adapter.mock");

exports.getRatpApiAdapter = ({ RATP_API_MOCK_DATA }) => {
  return RATP_API_MOCK_DATA ? RatpApiAdapterMock : RatpApiAdapter;
};
