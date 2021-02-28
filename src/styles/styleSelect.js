import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";

const couleurAnnee = "#070722ff";
const couleurMois = "#131347ff";
const couleurPolice = "#f8f4ffff";
const couleurDimanche = "#aad5f4";
const couleurNumeroJour = "D1C7CF";
const couleurJourFerie = "#33cc66";
const couleurVacances = "#e60000";
const couleurBord = "#3F3F6E";
const white = "#ffffff";
const black = "#000000";

export const StyleSelect = theme => ({
  root: {
    color: {white},
    backgroundColor: white,
    width: "100px",

    "&.header": { backgroundColor: couleurAnnee },
  }
});

export default withStyles(StyleSelect, { name: "MySelect" })(Select);
