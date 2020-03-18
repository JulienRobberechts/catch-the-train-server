const routes = require("../../tests/mock/ratp-api/data/routes");

async function getAllSchedulesRATP() {
  return routes;
}

module.exports = { getAllSchedulesRATP };
