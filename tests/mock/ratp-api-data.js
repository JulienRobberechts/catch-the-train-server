// change every 3 mins - Server Data
const mockedFullTimeTable = {
  routes: [
    {
      station: {
        code: "SGL",
        name: "Saint-Germain-en-Laye"
      },
      direction: "Marne-la-Vallée – Chessy",
      directionsAliases: [
        "Le Vésinet – Le Pecq",
        "Le Vésinet – Centre",
        "Chatou – Croissy",
        "Rueil-Malmaison",
        "Nanterre – Ville",
        "Nanterre – Université",
        "Nanterre-Préfecture",
        "La Défense",
        "Charles de Gaulle–Étoile",
        "Gare d'Auber",
        "Châtelet–Les Halles",
        "Gare de Lyon",
        "Nation",
        "Gare de Vincennes",
        "Val de Fontenay",
        "Neuilly-Plaisance",
        "Bry-sur-Marne",
        "Noisy-le-Grand – Mont d'Est",
        "Noisy – Champs",
        "Noisiel",
        "Lognes",
        "Torcy",
        "Bussy-Saint-Georges",
        "Val d'Europe",
        "Marne-la-Vallée – Chessy"
      ],
      trains: [
        {
          departureTime: "2020-03-10T09:24:00+01:00",
          platform: "2"
        },
        {
          departureTime: "2020-03-10T09:32:00+01:00",
          platform: "4"
        },
        {
          departureTime: "2020-03-10T09:43:00+01:00",
          platform: "2"
        },
        {
          departureTime: "2020-03-10T09:55:00+01:00",
          platform: "4"
        },
        {
          departureTime: "2020-03-10T10:05:00+01:00",
          platform: "4"
        }
      ]
    },
    {
      station: {
        code: "ML",
        name: "Maisons-Laffitte "
      },
      direction: "Cergy le Haut",
      directionsAliases: ["Cergy le Haut", "Châtelet–Les Halles"],
      trains: [
        {
          departureTime: "2020-03-10T09:26:00+01:00",
          platform: "A"
        },
        {
          departureTime: "2020-03-10T09:42:00+01:00",
          platform: "B"
        },
        {
          departureTime: "2020-03-10T09:57:00+01:00",
          platform: "A"
        },
        {
          departureTime: "2020-03-10T10:19:00+01:00",
          platform: "A"
        }
      ]
    }
  ]
};

module.exports = mockedFullTimeTable;
