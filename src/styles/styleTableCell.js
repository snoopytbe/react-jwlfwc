import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const xiketic = "#070722ff";
const royalBlueDark = "#131347ff";
const persianBlue = "#3838b9ff";
const magnolia = "#f8f4ffff";
const lavenderWeb = "#e2e8fbff";
const lavenderFloral = "#b57edcff";
const tumbleweed = "#d0a98fff";
const orchidPink = "#f7c7dbff";
const goldCrayola = "#edcb96ff";
const white = "#ffffff";

export const StyleTableCell = (theme) => ({
  root: {
    textAlign: "center",
    border: "1px solid",
    '&[class*="annee"]': {
      backgroundColor: xiketic,
      color: white
    },
    '&[class*="mois"]': {
      backgroundColor: royalBlueDark,
      color: white
    },
    '&[class*="jour"]': {
      backgroundColor: persianBlue,
      color: white
    }
  }
});

export default withStyles(StyleTableCell, { name: "MyTableCell" })(TableCell);
