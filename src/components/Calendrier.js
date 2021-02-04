import React from "react"
import { annee, mois } from "../data/constantes";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import TableCell from "../styles/styleTableCell";
import "moment/min/locales.min";

export default function Calendier() {
  const lignes = [];
  function colonnes(index) {
    const result = [];

    for (let i = 0; i < 11; i++) {
      let myDate = moment(
        `${index + 1}/${i < 4 ? i + 9 : i - 3}/${i < 4 ? annee : annee + 1}`,
        "DD/MM/YYYY"
      );
      myDate.locale("fr-FR");
      result.push(
        <>
          <TableCell>{myDate.isValid() && myDate.format("DD dd")}</TableCell>
          <TableCell>Description</TableCell>
        </>
      );
    }
    return result;
  }

  for (let i = 0; i < 31; i++) {
    lignes.push(<TableRow>{colonnes(i)}</TableRow>);
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
              {mois.map(item => (
                <TableCell className="mois" colSpan={2}>
                  {item.label}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {mois.map(() => (
                <>
                  <TableCell className="jour">Jour</TableCell>
                  <TableCell className="jour">Description</TableCell>
                </>
              ))}
            </TableRow>
            {lignes}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
