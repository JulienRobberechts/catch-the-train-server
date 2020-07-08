const moment = require("moment");

exports.matchTime = (now, msg, maxValidDelayInMinutes = 60) => {
  if (!msg) {
    throw Error(`Invalid message`);
  }

  const timePattern = /(?<hour>\d{2}):(?<minute>\d{2})/i;
  const timeResult = msg.match(timePattern);

  if (!timeResult) return undefined;

  const { hour, minute } = timeResult.groups;

  const resultMoment = moment.parseZone(now);

  resultMoment.set({ hour, minute, second: 0, millisecond: 0 });

  if (hour >= 24 || minute >= 60) {
    throw Error(`Invalid time`);
  }

  const oneHourAgoMoment = moment
    .parseZone(now)
    .subtract(maxValidDelayInMinutes, "minutes");

  if (oneHourAgoMoment.isAfter(resultMoment)) {
    resultMoment.add(1, "days");
  }

  return resultMoment.format();
};

exports.matchOnPlatform = (msg) => {
  const patternOnPlatform = /(à|a) quai/i;
  const isOnPlatform = patternOnPlatform.test(msg) ? true : undefined;
  return isOnPlatform;
};

exports.matchApproaching = (msg) => {
  const patternApproaching = /(à|a) l('| )approche/i;
  const isApproaching = patternApproaching.test(msg) ? true : undefined;
  return isApproaching;
};

exports.matchTerminus = (msg) => {
  const patternTerminus = /terminus/i;
  const isTerminus = patternTerminus.test(msg) ? true : undefined;
  return isTerminus;
};

exports.matchDeparture = (msg) => {
  const patternDeparture = /D(é|e)part/i;
  const isDeparture = patternDeparture.test(msg) ? true : undefined;
  return isDeparture;
};

exports.matchPlatformLabel = (msg) => {
  const patternPlatformLabel = /(Voie|V\.)\s*(?<platform>\w*)/i;
  const platformResults = msg.match(patternPlatformLabel);
  let platform;
  if (platformResults && platformResults.groups) {
    platform = platformResults.groups.platform;
  }
  return platform;
};

exports.matchNoPassenger = (msg) => {
  const patternNoPassenger = /Sans voyageurs|sans arrêt|Supprimé|Stationne/i;
  const noPassenger = patternNoPassenger.test(msg) ? true : undefined;
  return noPassenger;
};

exports.matchDelayed = (msg) => {
  const patternDelayed = /retardé/i;
  const isDelayed = patternDelayed.test(msg) ? true : undefined;
  return isDelayed;
};
