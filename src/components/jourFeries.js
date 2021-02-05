import moment from "moment";

/// <summary>
/// Work out the date for Easter Sunday for specified year
/// </summary>
/// <param name="year">The year as an integer</param>
/// <returns>Returns a datetime of Easter Sunday.</returns>
function Paques(year) {
  //should be
  //Easter Monday  28 Mar 2005  17 Apr 2006  9 Apr 2007  24 Mar 2008

  //Oudin's Algorithm - http://www.smart.net/~mmontes/oudin.html
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

/// <summary>
/// New Year's Day January 1 Nouvel An
/// </summary>
/// <param name="year"></param>
/// <returns></returns>
function NouvelAn(year) {
  return new Date(year, 0, 1);
}

/// <summary>
/// Easter Monday 1st Monday after Easter - Lundi de Pâques
/// </summary>
/// <param name="year"></param>
/// <returns></returns>
function LundiDePaques(year) {
  var paq = Paques(year);
  paq.add(1, "days");
  return new Date(year, paq.month(), paq.date());
}

//Labor Day May 1 - Fête du Travail
/// <summary>
/// Mays the day.
/// </summary>
/// <param name="year">The year.</param>
/// <returns></returns>
function PremierMai(year) {
  return new Date(year, 4, 1);
}

/// <summary>
/// Victory in Europe Day, 8 May - Fête de la Victoire
/// </summary>
/// <param name="year">The year.</param>
/// <returns></returns>
function HuitMai(year) {
  return new Date(year, 4, 8);
}

/// <summary>
/// Ascension 6th Thursday after Easter- Ascension
/// </summary>
/// <param name="year"></param>
/// <returns></returns>
function Ascension(year) {
  var paq = Paques(year);
  paq.add(4 + 7 * 5, "days");
  return new Date(year, paq.month(), paq.date());
}

/// <summary>
/// Whit Monday - Pentecost Monday 7th Monday after Easter - Lundi de Pentecôte
/// </summary>
/// <param name="year"></param>
/// <returns></returns>
function LundiDePentecote(year) {
  var paq = Paques(year);
  paq.add(1 + 7 * 7, "days");
  return new Date(year, paq.month(), paq.date());
}

/// <summary>
/// Fête FeteNationalee française, 14 July
/// </summary>
/// <param name="year"></param>
/// <returns></returns>
function FeteNationale(year) {
  return new Date(year, 6, 14);
}

/// <summary>
/// o of Mary August 15 - Assomption
/// </summary>
/// <param name="year"></param>
/// <returns></returns>
function Assomption(year) {
  return new Date(year, 7, 15);
}

/// <summary>
/// All Saints November 1 - Toussaint
/// </summary>
/// <param name="year"></param>
/// <returns></returns>
function Toussaint(year) {
  return new Date(year, 10, 1);
}

/// <summary>
/// Armistice Day November 11- Jour de l'armistice
/// </summary>
/// <param name="year"></param>
/// <returns></returns>
function Armistice(year) {
  return new Date(year, 10, 11);
}

/// <summary>
/// Noel December 25  - Noël
/// </summary>
/// <param name="year"></param>
/// <returns></returns>
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

/// <summary>
/// Check if a specific date is a public paqiday.
/// Obviously the Publicpaqiday list is more efficient for repeated checks
/// Note paqidays can fall on weekends and there is no fixed moving of such dates.
/// </summary>
/// <param name="dt">The date you wish to check</param>
/// <returns>True if date is a public paqiday</returns>
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
