const missionTestDoubleValid = require("../../tests/mock/ratp-api/data/mission-test-double.valid");

async function getMissionDetail() {
  return missionTestDoubleValid;
}

module.exports = getMissionDetail;
