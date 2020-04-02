const moment = require("moment");
const debug = require("debug")("ctt:api:schedule");
const {
  matchTime,
  matchOnPlatform,
  matchApproaching,
  matchTerminus,
  matchDeparture,
  matchPlatformLabel
} = require("./match-ratp-display");

// how long we can estimate a departure is still valid after the current time (in minutes)
const maxValidDelayInMinutes = 60;

// how long it will take to the train to arrive
// when the train is announced as approaching
const estimateApproachingDurationInSeconds = 10;

exports.formatSchedule = (now, msg) => {
  try {
    if (!now) throw Error("first parameter 'now' should not be falsy");
    if (!msg) throw Error("first parameter 'message' should not be falsy");

    let time = matchTime(now, msg, maxValidDelayInMinutes);
    const isDeparture = matchDeparture(msg);
    const platform = matchPlatformLabel(msg);
    const isTerminus = matchTerminus(msg);
    const isApproaching = matchApproaching(msg);

    if (isApproaching) {
      const nowMoment = moment(now).add(
        estimateApproachingDurationInSeconds,
        "seconds"
      );
      time = nowMoment.format();
    }

    const isOnPlatform = matchOnPlatform(msg);

    if (isOnPlatform) {
      const nowMoment = moment(now);
      time = nowMoment.format();
    }

    // interaction logic
    if (!time && !isTerminus) {
      throw Error(`No time or terminus`);
    }

    return {
      time,
      platform,
      isOnPlatform,
      isApproaching,
      isDeparture,
      isTerminus
    };
  } catch (error) {
    // log
    debug(`parsing error on message '${msg}': ${error.message}`);
    return {
      isInvalid: true
    };
  }
};
