import React from "react";
import { annee, mois, zone } from "../data/constantes";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import TableCell from "../styles/styleTableCell";
import "moment/min/locales.min";
import estFerie from "./jourFeries";
import estVacances from "./vacances";

export default function Calendier() {
  const lignes = [];

  function keygen() {
    return Math.random().toString(36).substr(2, 9);
  }

  function isOdd(x) {
    return x & 1;
  }

  function colonnes(index) {
    const result = [];

    for (let i = 0; i < 11; i++) {
      let myDate = moment(
        `${index + 1}/${i < 4 ? i + 9 : i - 3}/${i < 4 ? annee : annee + 1}`,
        "DD/MM/YYYY"
      );
      myDate.locale("fr-FR");
      result.push(
        <React.Fragment key={keygen()}>
          <TableCell
            className={
              myDate.isValid()
                ? estFerie(myDate)
                  ? "ferie"
                  : "jour"
                : "noDate"
            }
          >
            {myDate.isValid() && myDate.format("DD dd")}
          </TableCell>
          <TableCell
            className={
              myDate.isValid()
                ? myDate.day() === 0
                  ? "jour"
                  : isOdd(myDate.day())
                  ? "descriptionImpaire"
                  : "descriptionPaire"
                : "white"
            }
          >
            {estVacances(myDate, zone) && "Vacances"}
          </TableCell>
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
              <TableCell className="annee" colSpan={8}>
                {annee}
              </TableCell>
              <TableCell className="annee" colSpan={14}>
                {annee + 1}
              </TableCell>
            </TableRow>
            <TableRow>
              {mois.map((item, index) => (
                <React.Fragment key={keygen()}>
                  <TableCell className="mois" colSpan={2}>
                    {item.label}
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
            <TableRow>
              {mois.map(() => (
                <React.Fragment key={keygen()}>
                  <TableCell className="entete">Jour</TableCell>
                  <TableCell className="entete">Occupation</TableCell>
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
