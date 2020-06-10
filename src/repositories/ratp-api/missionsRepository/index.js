const getMissionDetail = require("./getMissionDetail");
const getMissionDetailMock = require("./getMissionDetail.mock");

exports.missionsRepository = {
  getMissionDetail,
};

exports.missionsRepositoryMocked = {
  getMissionDetail: getMissionDetailMock,
};
