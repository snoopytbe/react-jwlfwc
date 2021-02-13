// Inspiré de github.com/martinjw/Holiday

import moment from "moment";

function Paques(year) {
  //Oudin's Algorithm
  var g = year % 19;
  var c = year / 100;
  var h = (c - c / 4 - (8 * c + 13) / 25 + 19 * g + 15) % 30;
  var i = h - (h / 28) * (1 - (h / 28) * (29 / (h + 1)) * ((21 - g) / 11));
  var j = (year + year / 4 + i + 2 - c + c / 4) % 7;
  var p = i - j;
  var easterDay = 1 + ((p + 27 + (p + 6) / 40) % 31);
  var easterMonth = 3 + (p + 26) / 30;

  return moment().set({
    year: { year },
    month: easterMonth - 1,
    date: easterDay
  });
}

function NouvelAn(year) {
  return new Date(year, 0, 1);
}

function LundiDePaques(year) {
  var paq = Paques(year);
  paq.add(1, "days");
  return new Date(year, paq.month(), paq.date());
}

function PremierMai(year) {
  return new Date(year, 4, 1);
}

function HuitMai(year) {
  return new Date(year, 4, 8);
}

function Ascension(year) {
  var paq = Paques(year);
  paq.add(4 + 7 * 5, "days");
  return new Date(year, paq.month(), paq.date());
}

function LundiDePentecote(year) {
  var paq = Paques(year);
  paq.add(1 + 7 * 7, "days");
  return new Date(year, paq.month(), paq.date());
}

function FeteNationale(year) {
  return new Date(year, 6, 14);
}

function Assomption(year) {
  return new Date(year, 7, 15);
}

function Toussaint(year) {
  return new Date(year, 10, 1);
}

function Armistice(year) {
  return new Date(year, 10, 11);
}

function Noel(year) {
  return new Date(year, 11, 25);
}

function AreDateEquals(date1, date2) {
  return (
    date1.getYear() === date2.getYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export default function estFerie(myDate) {
  var year = myDate.year();
  var dt = new Date(year, myDate.month(), myDate.date());

  return (
    AreDateEquals(NouvelAn(year), dt) ||
    AreDateEquals(LundiDePaques(year), dt) ||
    AreDateEquals(LundiDePaques(year), dt) ||
    AreDateEquals(PremierMai(year), dt) ||
    AreDateEquals(Ascension(year), dt) ||
    AreDateEquals(HuitMai(year), dt) ||
    AreDateEquals(LundiDePentecote(year), dt) ||
    AreDateEquals(Ascension(year), dt) ||
    AreDateEquals(LundiDePentecote(year), dt) ||
    AreDateEquals(FeteNationale(year), dt) ||
    AreDateEquals(Assomption(year), dt) ||
    AreDateEquals(Toussaint(year), dt) ||
    AreDateEquals(Armistice(year), dt) ||
    AreDateEquals(Noel(year), dt)
  );
}
