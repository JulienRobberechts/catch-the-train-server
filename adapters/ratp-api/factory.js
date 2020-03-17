const RatpApiAdapter =
  process.env.SAMPLE_MODE === "true"
    ? require("./ratp-api-adapter.mock")
    : require("./ratp-api-adapter");
const { ratpApiRootUrl } = require("../../config");

const _apiAdapter = new RatpApiAdapter({ ratpApiRootUrl });

exports.getRatpApiAdapter = () => _apiAdapter;
