const schedulesTestDouble = require("../../tests/mock/ratp-api/data/schedules-test-double");

async function getAllSchedulesRATP() {
  return schedulesTestDouble;
}

module.exports = { getAllSchedulesRATP };
