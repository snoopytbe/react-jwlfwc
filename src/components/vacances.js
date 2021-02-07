import moment from "moment";

function estToussaint(dt) {
  // 3e samedi d'octobre
  var debutVacances = moment(new Date(dt.year(), 9, 1)).day(6 + 2 * 7);
  var finVacances = debutVacances.clone().add(15, "days");
  return (
    debutVacances.diff(dt, "days") <= 0 && finVacances.diff(dt, "days") >= 0
  );
}

function debutVacancesNoel(annee) {
  var Noel = moment(new Date(annee, 11, 25));
  return Noel.clone().day(6 - (Noel.day() === 0 ? 2 : 1) * 7);
}

function finVacancesNoel(annee) {
  var Noel = moment(new Date(annee, 11, 25));
  return debutVacancesNoel(annee).add(15 + (Noel.day() === 0 && 1), "days");
}

function estNoel(dt) {
  // Attention le début et la fin des vacances sont sur deux années différentes
  // Démarre le samedi qui précède Noël
  var debutVacances = debutVacancesNoel(dt.year());
  var finVacances = finVacancesNoel(dt.year() - 1);
  return (
    debutVacances.diff(dt, "days") <= 0 || finVacances.diff(dt, "days") >= 0
  );
}

function estFevrier(dt, zone) {
  // Démarre 5 semaines après la fin des vacances de Noël pour la première zone
  var Numero;

  switch (zone) {
    case "A":
      Numero = ((dt.year() - 2018) % 3) + 1;
      break;
    case "B":
      Numero = ((dt.year() - 2018) % 3) + 3;
      break;
    case "C":
      Numero = ((dt.year() - 2018) % 3) + 2;
      break;
    default:
      Numero = 0;
  }

  var debutVacances = finVacancesNoel(dt.year() - 1).day(6 + (3 + Numero) * 7);
  var finVacances = debutVacances.clone().add(15, "days");

  return (
    debutVacances.diff(dt, "days") <= 0 && finVacances.diff(dt, "days") >= 0
  );
}

export default function estVacances(dt, zone) {
  return estToussaint(dt) || estNoel(dt) || estFevrier(dt, zone);
}
