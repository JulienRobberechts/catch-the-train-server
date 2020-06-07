const schedulesTestDoubleValid = require("../../tests/mock/ratp-api/data/schedules-test-double.valid");

async function getAllSchedulesRATP() {
  return schedulesTestDoubleValid;
}

module.exports = getAllSchedulesRATP;
