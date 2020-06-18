const stationsList = require("../../../data/ratp/rers/A/stations.json");

const getSchedulesForASpecialMission = (mission) => {
  if (
    !mission ||
    !mission.type ||
    !mission.way ||
    !mission.origin ||
    !mission.destination ||
    !mission.origin.section ||
    !mission.destination.section ||
    !mission.origin.order ||
    !mission.destination.order
  )
    throw Error(
      "invalid mission - should contains type, way, origin and destination with section and order"
    );

  if (mission.type !== 2)
    throw Error("invalid mission - should contains type = Special");

  if (
    mission.origin.section === mission.destination.section &&
    mission.origin.order === mission.destination.order
  )
    throw Error("invalid mission with same ");

  // console.log("mission :>> ", mission);
  // console.log("mission :>> ", mission);
  // console.log("mission :>> ", mission);

  const sections = getSectionsForMission(
    [],
    mission.origin.section,
    mission.way,
    mission.destination.section
  );
  return {
    mission: mission.missionCode,
    stations: [
      "grande+arche+la+defense",
      "charles+de+gaulle+etoile",
      "auber",
      "chatelet+les+halles",
      "gare+de+lyon",
      "nation",
    ],
  };
};

const getSectionsForMission = (
  previousSectionPath,
  currentSection,
  way,
  targetSection
) => {
  const sectionPath = [...previousSectionPath, currentSection];
  if (currentSection === targetSection) return sectionPath;

  const nextSections =
    way === "forward"
      ? getNextSections(currentSection)
      : getPreviousSections(currentSection);

  if (nextSections.length === 0) return null;

  const validPath = nextSections
    .map((nextSection) =>
      getSectionsForMission(sectionPath, nextSection, way, targetSection)
    )
    .find((p) => !!p);

  return validPath ? validPath : null;
};

const getNextSections = (section) => {
  const sectionData = stationsList.find(
    (station) => station.section === section && station.nextSections
  );
  return sectionData ? sectionData.nextSections : [];
};

const getPreviousSections = (section) => {
  const previousSections = stationsList
    .filter(
      (station) =>
        station.nextSections && station.nextSections.includes(section)
    )
    .map((station) => station.section);
  return previousSections;
};

module.exports = {
  getSchedulesForASpecialMission,
  getSectionsForMission,
  getNextSections,
  getPreviousSections,
};
