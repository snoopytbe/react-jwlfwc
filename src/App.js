import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { theme, useStyles } from "./styles/styles";
import Calendrier from "./components/Calendrier/Calendrier";
import Occupation from "./components/Occupation/Occupation";
import TableauSynthese from "./components/Synthese/TableauSynthese2";

export default function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Typography variant="h4">Calendrier</Typography>

        <br />

        <TableauSynthese />
        <br />
      </div>
    </ThemeProvider>
  );
}
