import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const couleurAnnee = "#070722ff";
const couleurMois = "#131347ff";
const couleurPolice = "#f8f4ffff";
const couleurDimanche = "#aad5f4";
const couleurNumeroJour = "D1C7CF";
const couleurJourFerie = "#33cc66";
const couleurVacances = "#e60000";
const white = "#ffffff";
const black = "#000000";

export const StyleTableCell = (theme) => ({
  root: {
    textAlign: "center",
    border: `1px solid ${white}`,
    padding: "5px",
    color: couleurPolice,

    "&.annee": {
      backgroundColor: couleurAnnee,
      fontSize: "1.5em"
    },
    "&.mois": {
      backgroundColor: couleurMois,
      fontSize: "1.1em"
    },
    "&.numerojour": {
      backgroundColor: couleurNumeroJour,
      borderBottomColor: couleurNumeroJour
    },
    "&.jour": {
      backgroundColor: white,
      color: black
    },
    "&.description": {
      minWidth: "50px"
    },
    "&.dimanche": {
      backgroundColor: couleurDimanche,
      borderLeftColor: couleurDimanche,
      borderRightColor: couleurDimanche,
      color: black
    },
    "&.ferie": {
      backgroundColor: couleurJourFerie,
      borderLeftColor: couleurJourFerie,
      borderRightColor: couleurJourFerie,
      color: black
    },
    "&.noDate": {
      backgroundColor: white
    },
    "&.vacances": {
      maxWidth: "1px",
      minWidth: "1px",
      backgroundColor: couleurVacances,
      borderBottomColor: couleurVacances,
      borderTopColor: couleurVacances,
      borderRightColor: couleurNumeroJour
    },
    "&.bordvacances": {
      borderRightColor: couleurNumeroJour
    }
  }
});

export default withStyles(StyleTableCell, { name: "MyTableCell" })(TableCell);
