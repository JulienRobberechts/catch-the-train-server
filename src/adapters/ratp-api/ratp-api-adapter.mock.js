const schedulesTestDoubleValid = require("../../tests/mock/ratp-api/data/schedules-test-double.valid");
const schedulesTestDoubleUnavailable = require("../../tests/mock/ratp-api/data/schedules-test-double.unavailable");
const config = require("../../config");

async function getAllSchedulesRATP() {
  return config.RATP_API_MOCK_DATA_INVALID
    ? schedulesTestDoubleUnavailable
    : schedulesTestDoubleValid;
}

module.exports = { getAllSchedulesRATP };
