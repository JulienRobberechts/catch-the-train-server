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
  ) {
    throw Error(
      "invalid mission - should contains type, way, origin and destination with section and order"
    );
  }

  if (mission.type !== 2) {
    throw Error("invalid mission - should contains type = Special");
  }

  if (
    mission.origin.section === mission.destination.section &&
    mission.origin.order === mission.destination.order
  ) {
    throw Error("invalid mission with same ");
  }

  const sections = getSectionsForMission(
    [],
    mission.origin.section,
    mission.way,
    mission.destination.section
  );

  const stationsOfSections = sections
    .map((section) => getSectionStations(section, mission.way))
    .flat();

  const originIndex = stationsOfSections.findIndex(
    (s) => s === mission.origin.slug
  );
  const destinationIndex = stationsOfSections.findIndex(
    (s) => s === mission.destination.slug
  );

  const stations = stationsOfSections.slice(originIndex, destinationIndex + 1);

  return {
    mission: mission.missionCode,
    stations,
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

const getSectionStations = (section, way) => {
  const stations = stationsList
    .filter((station) => station.section === section)
    .sort((s1, s2) =>
      way === "forward" ? s1.order - s2.order : s2.order - s1.order
    )
    .map((s) => s.slug);
  return stations;
};

module.exports = {
  getSchedulesForASpecialMission,
  getSectionsForMission,
  getNextSections,
  getPreviousSections,
  getSectionStations,
};
