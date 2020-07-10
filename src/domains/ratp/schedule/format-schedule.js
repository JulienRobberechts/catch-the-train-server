const moment = require("moment");
const debug = require("debug")("ctt:api:schedule");
const {
  matchTime,
  matchOnPlatform,
  matchApproaching,
  matchTerminus,
  matchDeparture,
  matchPlatformLabel,
  matchNoPassenger,
  matchDelayed,
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
    const noPassenger = matchNoPassenger(msg);
    const isDelayed = matchDelayed(msg);

    if (isApproaching) {
      const nowMoment = moment
        .parseZone(now)
        .add(estimateApproachingDurationInSeconds, "seconds");
      time = nowMoment.format();
    }

    // Message like "Départ Voie 4" means isOnPlatform
    const isProbablyOnPlatform =
      !time && isDeparture && platform && !isTerminus;

    const isOnPlatform =
      matchOnPlatform(msg) || isProbablyOnPlatform ? true : undefined;

    const noTime = !time && !isTerminus && !noPassenger;
    const isUnknownTime = !isOnPlatform && noTime ? true : undefined;
    const isImminent = isOnPlatform && noTime;

    return {
      noPassenger,
      departureTime: time,
      platform,
      isOnPlatform,
      isApproaching,
      isDeparture,
      isTerminus,
      isDelayed,
      isUnknownTime,
      isImminent,
    };
  } catch (error) {
    // log
    debug(`parsing error on message '${msg}': ${error.message}`);
    return {
      originalMsg: msg,
      error: error.message,
    };
  }
};
