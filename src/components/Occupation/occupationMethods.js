import { jours, mois, annee } from "../../data/constantes";
import moment from "moment";
import "moment/min/locales.min";
import { nthDay } from "./../vacances";

export const listeDates = data => {
  const result = [];

  if (data.hasOwnProperty("regulier"))
    data.regulier.length > 1 &&
      data.regulier.map((reservation, index) => {
        if (index < data.regulier.length - 1) {
          mois.map(mois => {
            let maDate = nthDay(
              moment(
                new Date(annee + (mois.numero < 9 ? 1 : 0), mois.numero - 1, 1)
              ),
              jours.reduce((prec, value) => {
                return (
                  prec + (reservation.jours === value.nom ? value.numero : 0)
                );
              }, 0),
              reservation.numerosjours[0]
            );
            maDate.locale("fr-FR");
            maDate.isValid() && result.push(maDate);
          });
        }
      });

  if (data.hasOwnProperty("exceptionnel"))
    data.exceptionnel.length > 1 &&
      data.exceptionnel.map((exceptionnel, index) => {
        if (index < data.exceptionnel.length - 1) {
          let maDate = moment(exceptionnel.date);
          maDate.locale("fr-FR");
          maDate.isValid() && result.push(maDate);
        }
      });

  let resultSansDoublon = result.reduce(
    (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
    []
  );

  let resultWithDelete = [];
  resultWithDelete = resultSansDoublon;

  console.log(JSON.stringify(data));
  if (data.hasOwnProperty("suppression")) {
    data.suppression.length > 1 &&
      data.suppression.map((suppression, index) => {
        if (index < data.suppression.length - 1) {
          moment.locale("fr-FR");
          let maDate = moment(suppression.date, "dddd DD/MM/YYYY");
          console.log(maDate);
          maDate.locale("fr-FR");
          if (maDate.isValid()) {
            let pos = resultSansDoublon.indexOf(maDate);
            resultWithDelete =
              pos >= 0 ? resultSansDoublon.splice(pos, 1) : resultSansDoublon;
          }
        }
      });
  }

  let resultTrie = resultWithDelete.sort((a, b) => a.valueOf() - b.valueOf());

  return resultTrie;
};

function json2array(json) {
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(key => {
    result.push(json[key]);
  });
  return result;
}

function isEmptyLastField(data, fieldName, exception) {
  var result = false;
  const fields = data[fieldName];
  if (data.hasOwnProperty(fieldName)) {
    let last = fields[fields.length - 1];
    result = true;
    for (let value in last) {
      if (value !== exception) result = result && last[value] === "";
    }
  }
  return result;
}

export const checkLastField = (
  data,
  regulierAppend,
  exceptionnelAppend,
  suppressionAppend
) => {
  if (!isEmptyLastField(data, "regulier"))
    regulierAppend({
      numerosjours: "",
      jours: "",
      temple: "",
      sallehumide: "",
      heure: ""
    });

  if (data.hasOwnProperty("exceptionnel")) {
    console.log(isEmptyLastField(data, "exceptionnel", "date"));
    let last = data.exceptionnel[data.exceptionnel.length - 1];
    let estVide =
      last.temple === "" && last.sallehumide === "" && last.heure === "";
    if (!estVide)
      exceptionnelAppend({ date: "", temple: "", sallehumide: "", heure: "" });
  }

  if (data.hasOwnProperty("suppression")) {
    let last = data.suppression[data.suppression.length - 1];
    let estVide = last.date === "";
    if (!estVide)
      suppressionAppend({
        date: ""
      });
  }
};
