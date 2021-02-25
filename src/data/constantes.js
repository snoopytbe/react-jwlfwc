import React from "react";

export const annee = 2020;

export const zone = "A";

export const jours = [
  { nom: "lundi", numero: 1 },
  { nom: "mardi", numero: 2 },
  { nom: "mercredi", numero: 3 },
  { nom: "jeudi", numero: 4 },
  { nom: "vendredi", numero: 5 },
  { nom: "samedi", numero: 6 },
  { nom: "dimanche", numero: 0 }
];

export const mois = [
  { nom: "Septembre", numero: 9 },
  { nom: "Octobre", numero: 10 },
  { nom: "Novembre", numero: 11 },
  { nom: "Décembre", numero: 12 },
  { nom: "Janvier", numero: 1 },
  { nom: "Février", numero: 2 },
  { nom: "Mars", numero: 3 },
  { nom: "Avril", numero: 4 },
  { nom: "Mai", numero: 5 },
  { nom: "Juin", numero: 6 },
  { nom: "Juillet", numero: 7 }
];

export const structureForm =  {
  regulier: [
    { nom: "numerosjours", type: "Select", xs: 4, sm:2},
    { nom: "jours", type: "Select", xs: 4, sm:2},
    { nom: "temple", type: "Select", xs: 4, sm:2},
    { nom: "sallehumide", type: "Select", xs: 4, sm:2},
    { nom: "heure", type: "Select", xs: 4, sm:3}
  ],
  exceptionnel: [
    { nom: "date", type: "DatePicker", xs: 4, sm:2},
    { nom: "temple", type: "Select", xs: 4, sm:2},
    { nom: "sallehumide", type: "Select", xs: 4, sm:2},
    { nom: "heure", type: "Select", xs: 4, sm:3}
  ],
  suppression: [
    { nom: "date", type: "Select", xs: 4, sm:2}
  ]
}

export const data = () => {
  const horaires = [];
  for (let i = 9; i <= 23; i++)
    for (let j = 0; j < 2; j++)
      horaires.push(i + "h" + (j === 0 ? "00" : "30"));

  const nomJours = [];
  jours.map(value => nomJours.push(value.nom));

  return {
    jours: {
      nom: "Jour",
      liste: nomJours
    },
    numerosjours: {
      nom: "Semaine",
      liste: ["1er", "2eme", "3eme", "4eme", "5eme"]
    },
    temple: {
      nom: "Temple",
      liste: ["Berteaux (RDC)", "Ramsay (ETG)", "Aucun temple"]
    },
    sallehumide: {
      nom: "Salle humide",
      liste: [
        "Salle humide Cuisine",
        "Salle humide Jardin",
        "Les 2 salles humides",
        "Aucune salle humide"
      ]
    },
    heure: {
      nom: "Heure",
      liste: horaires
    }
  };
};
