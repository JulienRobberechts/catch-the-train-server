const RatpApiAdapter = process.env.SAMPLE_MODE
  ? require("./ratp-api-adapter.mock")
  : require("./ratp-api-adapter");

const _apiAdapter = new RatpApiAdapter();

exports.getRatpApiAdapter = () => _apiAdapter;
