const getAllSchedulesRATP = require("./getAllSchedulesRATP");
const getAllSchedulesRATPMock = require("./getAllSchedulesRATP.mock");

exports.schedulesRepository = {
  getAllSchedulesRATP,
};

exports.schedulesRepositoryMocked = {
  getAllSchedulesRATP: getAllSchedulesRATPMock,
};
