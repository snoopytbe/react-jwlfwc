import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const xiketic = "#070722ff";
const royalBlueDark = "#131347ff";
const persianBlue = "#3838b9ff";
const magnolia = "#f8f4ffff";
const lavenderWeb = "#e2e8fbff";
const lavenderBlue = "#D8D8FDff";
const mediumPurple = "#8c8ce6ff";
const darkBlueGrey = "6F6FAB";
const white = "#ffffff";
const black = "#000000";

export const StyleTableCell = (theme) => ({
  root: {
    textAlign: "center",
    border: `1px solid ${white}`,

    '&[class*="annee"]': {
      backgroundColor: xiketic,
      color: magnolia
    },
    '&[class*="mois"]': {
      backgroundColor: royalBlueDark,
      color: magnolia
    },
    '&[class*="entete"]': {
      backgroundColor: persianBlue,
      color: magnolia
    },
    '&[class*="jour"]': {
      backgroundColor: mediumPurple,
      color: magnolia
    },
    '&[class*="descriptionPaire"]': {
      backgroundColor: lavenderWeb
    },
    '&[class*="descriptionImpaire"]': {
      backgroundColor: lavenderBlue
    },
    '&[class*="dimanche"]': {
      backgroundColor: darkBlueGrey
    }
  }
});

export default withStyles(StyleTableCell, { name: "MyTableCell" })(TableCell);
