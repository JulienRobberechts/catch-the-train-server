const {
  getMissionDetailsMock,
} = require("../../../tests/mock/ratp-api/getMissionDetailsMock");

async function getMissionDetail({ missionCode }) {
  return getMissionDetailsMock(missionCode);
}

module.exports = getMissionDetail;
