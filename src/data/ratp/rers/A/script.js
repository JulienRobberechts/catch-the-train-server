const stationDraft = require("./stations.json");
const fs = require("fs");

function onlyUnique(item, index, sourceArray) {
  return sourceArray.findIndex(i => i.slug === item.slug) === index;
}

var stationUnique = stationDraft.filter(onlyUnique);

fs.writeFile(
  "./data/ratp/rers/A/stationUnique.json",
  JSON.stringify(stationUnique),
  function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("stationUnique file saved");
  }
);

// console.log(stationUnique);
