const getAllSchedulesRATP = require("./getAllSchedulesRATP");
const getAllSchedulesRATPMock = require("./getAllSchedulesRATP.mock");

const getMissionDetail = require("./getMissionDetail");
const getMissionDetailMock = require("./getMissionDetail.mock");

exports.schedulesRepository = {
  getAllSchedulesRATP,
};

exports.schedulesRepositoryMocked = {
  getAllSchedulesRATP: getAllSchedulesRATPMock,
};

exports.missionsRepository = {
  getMissionDetail,
};

exports.missionsRepositoryMocked = {
  getMissionDetail: getMissionDetailMock,
};
