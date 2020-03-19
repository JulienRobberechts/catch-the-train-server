const timeTable = {
  routes: [
    {
      station: {
        code: "saint-germain-en-laye",
        name: "Saint-Germain-en-Laye"
      },
      direction: "Marne-la-Vallée – Chessy",
      destinations: [
        "le-vesinet-le-pecq",
        "le-vesinet-centre",
        "chatou-croissy",
        "rueil-malmaison",
        "nanterre-ville",
        "nanterre-universite",
        "nanterre-prefecture",
        "la-defense",
        "charles-de-gaulle-etoile",
        "gare-d-auber",
        "châtelet–les-halles",
        "gare-de-lyon",
        "nation",
        "gare-de-vincennes",
        "val-de-fontenay",
        "neuilly-plaisance",
        "bry-sur-marne",
        "noisy-le-grand-mont-d-est",
        "noisy-champs",
        "noisiel",
        "lognes",
        "torcy",
        "bussy-saint-georges",
        "val-d-europe",
        "marne-la-vallee-chessy"
      ],
      trains: [
        {
          departureTime: "2020-03-10T09:24:00+01:00",
          platform: "2",
          trainCode: "0924"
        },
        {
          departureTime: "2020-03-10T09:32:00+01:00",
          platform: "4",
          trainCode: "0932"
        },
        {
          departureTime: "2020-03-10T09:43:00+01:00",
          platform: "2",
          trainCode: "0943"
        },
        {
          departureTime: "2020-03-10T09:55:00+01:00",
          platform: "4",
          trainCode: "0955"
        },
        {
          departureTime: "2020-03-10T10:05:00+01:00",
          platform: "4",
          trainCode: "1005"
        },
        {
          departureTime: "2020-03-10T10:35:00+01:00",
          platform: "4",
          trainCode: "1035"
        }
      ]
    },
    {
      station: {
        code: "maisons-laffitte",
        name: "Maisons-Laffitte "
      },
      direction: "Cergy le Haut",
      destinations: [
        "achères-ville",
        "conflans-fin-d-oise",
        "neuville-universite",
        "cergy-prefecture",
        "cergy-saint-christophe",
        "cergy-le-haut"
      ],
      trains: [
        {
          departureTime: "2020-03-10T09:26:00+01:00",
          platform: "A",
          trainCode: "0926"
        },
        {
          departureTime: "2020-03-10T09:42:00+01:00",
          platform: "B",
          trainCode: "0942"
        },
        {
          departureTime: "2020-03-10T09:57:00+01:00",
          platform: "A",
          trainCode: "0957"
        },
        {
          departureTime: "2020-03-10T10:19:00+01:00",
          platform: "A",
          trainCode: "1019"
        }
      ]
    },
    {
      station: {
        code: "maisons-laffitte",
        name: "Maisons-Laffitte "
      },
      direction: "Marne-la-Vallée – Chessy",
      destinations: [
        "maisons-laffitte",
        "sartrouville",
        "houilles-carrieres-sur-seine",
        "nanterre-prefecture",
        "la-defense",
        "charles-de-gaulle-etoile",
        "gare-d-auber",
        "châtelet–les-halles",
        "gare-de-lyon",
        "nation",
        "gare-de-vincennes",
        "val-de-fontenay",
        "neuilly-plaisance",
        "bry-sur-marne",
        "noisy-le-grand-mont-d-est",
        "noisy-champs",
        "noisiel",
        "lognes",
        "torcy",
        "bussy-saint-georges",
        "val-d-europe",
        "marne-la-vallee-chessy"
      ],
      trains: [
        {
          departureTime: "2020-03-10T09:29:00+01:00",
          platform: "B",
          trainCode: "0929"
        },
        {
          departureTime: "2020-03-10T09:40:00+01:00",
          platform: "B",
          trainCode: "0940"
        },
        {
          departureTime: "2020-03-10T09:55:00+01:00",
          platform: "B",
          trainCode: "0955"
        },
        {
          departureTime: "2020-03-10T10:09:00+01:00",
          platform: "B",
          trainCode: "1009"
        }
      ]
    }
  ]
};

module.exports = timeTable;
