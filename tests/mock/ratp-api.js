const nock = require("nock");
const testDoubleData = require("./ratp-api-data.js");
const config = require("../../config");

const mockRatpApi = () => {
  nock(config.RatpApiRootUrl)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/all")
    .reply(200, testDoubleData);
};

module.exports = { mockRatpApi };
