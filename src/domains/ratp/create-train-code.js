const moment = require("moment");

exports.createTrainCode = timeString => {
  if (!timeString) {
    return undefined;
  }
  const momentTime = moment.parseZone(timeString);
  if (!momentTime.isValid()) {
    return undefined;
  }
  return momentTime.format("kkmm");
};
