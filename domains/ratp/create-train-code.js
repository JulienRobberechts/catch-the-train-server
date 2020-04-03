const moment = require("moment");

exports.createTrainCode = timeString => {
  const momentTime = moment.parseZone(timeString);
  return momentTime.format("kkmm");
};
