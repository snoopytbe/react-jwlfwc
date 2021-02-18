import React from "react";
import { annee, mois, zone, data } from "../../data/constantes";
import { initialValues } from "../../data/initialValues";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import TableCell from "../../styles/styleTableCell";
import "moment/min/locales.min";
import estFerie from "./jourFeries";
import estVacances from "./vacances";
import { keygen } from "../../utils/utils";
import { listeDates } from "../Occupation/occupationMethods";

export default function Calendier() {
  const lignes = [];

  const datesOccupation = listeDates(initialValues);
  console.log(datesOccupation);

  function colonnes(index) {
    const result = [];

    function classDescription(jour) {
      return jour.isValid()
        ? estFerie(jour)
          ? "ferie"
          : jour.day() === 0
          ? "dimanche"
          : "jour"
        : "noDate";
    }

    for (let i = 0; i < 11; i++) {
      let myDate = moment(
        `${index + 1}/${i < 4 ? i + 9 : i - 3}/${i < 4 ? annee : annee + 1}`,
        "DD/MM/YYYY"
      );
      myDate.locale("fr-FR");
      result.push(
        // Numéro du jour
        <React.Fragment key={keygen()}>
          <TableCell
            className={
              myDate.isValid()
                ? estFerie(myDate)
                  ? "ferie"
                  : "numerojour"
                : "noDate"
            }
          >
            {myDate.isValid() && myDate.format("DD")}
          </TableCell>
          {/* Initiale du jour */}
          <TableCell className={classDescription(myDate)}>
            {myDate.isValid() && myDate.format("dd")[0].toUpperCase()}
          </TableCell>

          {/* Occupation du temple */}
          <TableCell className={"description " + classDescription(myDate)}>
            {myDate.isValid() &&
              datesOccupation.reduce((prev, act) => {
                return prev || (act.diff(myDate, "days") === 0)
              }, false) &&
              "LBF"}
          </TableCell>

          {/* Vacances scolaires */}
          <TableCell
            className={
              myDate.isValid()
                ? estVacances(myDate, zone)
                  ? "vacances"
                  : classDescription(myDate) + " bordvacances"
                : "noDate"
            }
          />
        </React.Fragment>
      );
    }
    return result;
  }

  for (let i = 0; i < 31; i++) {
    lignes.push(<TableRow key={keygen()}>{colonnes(i)}</TableRow>);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="annee" colSpan={16}>
                {annee}
              </TableCell>
              <TableCell className="annee" colSpan={28}>
                {annee + 1}
              </TableCell>
            </TableRow>
            <TableRow>
              {mois.map((item, index) => (
                <React.Fragment key={keygen()}>
                  <TableCell className="mois" colSpan={4}>
                    {item.nom}
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
            {lignes}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
