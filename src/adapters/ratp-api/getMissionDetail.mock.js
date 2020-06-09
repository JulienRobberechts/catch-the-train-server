const {
  getMissionDetailsMock,
} = require("../../tests/mock/ratp-api/mockMissionsCalls");

async function getMissionDetail({ missionCode }) {
  return getMissionDetailsMock(missionCode);
}

module.exports = getMissionDetail;
