import { jours, mois, annee } from "../../data/constantes";
import moment from "moment";
import "moment/min/locales.min";
import { nthDay } from "../Calendrier/vacances";

export const listeDates = data => {
  const result = [];

  if (data.hasOwnProperty("regulier")) {
    var lastIndex = data.regulier.length - 1;
    if (isEmptyLastField(data, "regulier")) lastIndex -= 1;
    data.regulier.map((reservation, index) => {
      if (index <= lastIndex) {
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
  }

  if (data.hasOwnProperty("exceptionnel")) {
    var lastIndex = data.exceptionnel.length - 1;
    if (isEmptyLastField(data, "exceptionnel", "date")) lastIndex -= 1;
    data.exceptionnel.map((exceptionnel, index) => {
      if (index <= lastIndex) {
        let maDate = moment(exceptionnel.date);
        maDate.locale("fr-FR");
        maDate.isValid() && result.push(maDate);
      }
    });
  }

  let resultSansDoublon = result.reduce(
    (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
    []
  );

  let resultWithDelete = [];
  resultWithDelete = resultSansDoublon;

  if (data.hasOwnProperty("suppression")) {
    var lastIndex = data.suppression.length - 1;
    if (isEmptyLastField(data, "suppression")) lastIndex -= 1;
    data.suppression.map((suppression, index) => {
      if (index <= lastIndex) {
        let dateSansJour = suppression.date.slice(
          suppression.date.indexOf(" ")
        );
        let maDate = moment(dateSansJour, "DD/MM/YYYY").locale("fr-FR");
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

function isEmptyLastField(data, fieldName, exception) {
  var result = false;
  const fields = data[fieldName];
  if (data.hasOwnProperty(fieldName)) {
    let last = fields[fields.length - 1];
    result = true;
    for (let value in last) {
      if (value !== exception)
        result =
          result && (last[value] === "" || typeof last[value] === "undefined");
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

  if (!isEmptyLastField(data, "exceptionnel", "date"))
    exceptionnelAppend({ date: "", temple: "", sallehumide: "", heure: "" });

  if (!isEmptyLastField(data, "suppression")) suppressionAppend({ date: "" });
};
