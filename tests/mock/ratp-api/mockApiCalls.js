const nock = require("nock");
const routesTestDouble = require("./data/routes");
const config = require("../../../config");

const mockApiCalls = () => {
  nock(config.RatpApiRootUrl)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/all")
    .reply(200, routesTestDouble);
};

module.exports = { mockApiCalls };
