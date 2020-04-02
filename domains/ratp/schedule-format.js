const moment = require("moment");

const invalidResult = {
  isInvalid: true
};

const formatSchedule = (now, msg) => {
  if (!now || !msg) {
    return invalidResult;
  }

  // Time
  const timePattern = /(?<hour>\d{2}):(?<minute>\d{2})/i;
  const times = msg.match(timePattern);
  console.log({ times });

  let time;

  if (times && times.groups) {
    const hour = times.groups["hour"];
    console.log("hour", hour);
    const minute = times.groups["minute"];
    console.log("minute", minute);

    // const hourMoment = moment(times, "HH:mm");
    // console.log("hourMoment", hourMoment.format());
    // const time = hourMoment.format();

    const resultMoment = moment(now);
    console.log("resultMoment v1", resultMoment.format());

    // nowMoment.set("hour", hour);
    // console.log("nowMoment v2", nowMoment.format());
    // nowMoment.set("minute", minute);
    // console.log("nowMoment v3", nowMoment.format());
    resultMoment.set({ hour, minute, second: 0, millisecond: 0 });

    if (hour >= 24 || minute >= 60) {
      return invalidResult;
    }

    console.log("resultMoment v2", resultMoment.format());

    const oneHourAgoMoment = moment(now).subtract(1, "hours");
    console.log("oneHourAgoMoment", oneHourAgoMoment.format());

    if (oneHourAgoMoment.isAfter(resultMoment)) {
      resultMoment.add(1, "days");
    }

    console.log("resultMoment v3", resultMoment.format());

    time = resultMoment.format();
  }

  // Departure
  const containsDepart = /Départ/i;
  console.log("containsDepart.test(msg)", containsDepart.test(msg));
  const isDeparture = containsDepart.test(msg) ? true : undefined;
  console.log({ isDeparture });

  // Platform
  const platformPattern = /(Voie|V.)\s*(?<platform>\w)/i;
  const platformResults = msg.match(platformPattern);
  console.log("platformResults", platformResults);

  let platform;
  if (platformResults && platformResults.groups) {
    platform = platformResults.groups.platform;
  }
  console.log("platform", platform);

  console.log({ isDeparture });

  // Terminus
  const containsTerminus = /train terminus/i;
  const isTerminus = containsTerminus.test(msg) ? true : undefined;
  console.log({ isTerminus });

  // Approaching
  const containsApproaching = /train à l'approche/i;
  const isApproaching = containsApproaching.test(msg) ? true : undefined;
  console.log({ isApproaching });

  if (isApproaching) {
    const nowMoment = moment(now).add(10, "seconds");
    time = nowMoment.format();
  }

  // OnPlatform
  const containsOnPlatform = /Train à quai/i;
  const isOnPlatform = containsOnPlatform.test(msg) ? true : undefined;
  console.log({ isOnPlatform });

  if (isOnPlatform) {
    const nowMoment = moment(now);
    time = nowMoment.format();
  }

  // interaction logic
  if (!time && !isTerminus) {
    return invalidResult;
  }

  return {
    time,
    platform,
    isOnPlatform,
    isApproaching,
    isDeparture,
    isTerminus
  };
};

module.exports = { formatSchedule };
