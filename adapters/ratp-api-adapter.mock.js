const routes = require("../tests/mock/ratp-api/data/routes");

const getAllSchedulesRATP = async () => {
  return routes;
};

module.exports = { getAllSchedulesRATP };
