const nock = require("nock");
const routesTestDouble = require("./data/routes");
var config = require("../../../config");

const mockApiCalls = () => {
  nock(config.RATP_API_ROOT_URL)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/all")
    .reply(200, routesTestDouble);
};

module.exports = { mockApiCalls };
