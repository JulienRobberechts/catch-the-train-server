const routes = require("../tests/mock/ratp-api/data/routes");
class RatpApiAdapter {
  async getAllSchedulesRATP() {
    return routes;
  }
}

module.exports = RatpApiAdapter;
