import React from "react";

export const mois = [
  { label: "Septembre" },
  { label: "Octobre" },
  { label: "Novembre" },
  { label: "Décembre" },
  { label: "Janvier" },
  { label: "Février" },
  { label: "Mars" },
  { label: "Avril" },
  { label: "Mai" },
  { label: "Juin" },
  { label: "Juillet" }
];

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

export const data = () => {
  const horaires = [];
  for (let i = 9; i <= 23; i++)
    for (let j = 0; j < 2; j++)
      horaires.push(i + "h" + (j === 0 ? "00" : "30"));

  const NomJours = [];
  jours.map((value) => NomJours.push(value.nom));

  return {
    mois: [
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet"
    ],
    jours: {
      nom: "Jour",
      liste: NomJours
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
    horaire: horaires
  };
};