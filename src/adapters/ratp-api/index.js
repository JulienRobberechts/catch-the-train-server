const getAllSchedulesRATP = require("./schedulesRepository/getAllSchedulesRATP");
const getAllSchedulesRATPMock = require("./schedulesRepository/getAllSchedulesRATP.mock");

const getMissionDetail = require("./missionsRepository/getMissionDetail");
const getMissionDetailMock = require("./missionsRepository/getMissionDetail.mock");

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
