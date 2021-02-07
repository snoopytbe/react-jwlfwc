import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { theme, useStyles } from "./styles/styles";
import Calendrier from "./components/Calendrier";
import moment from "moment";
import estToussaint from "./components/vacances";

export default function App() {
  const classes = useStyles();
  console.log((2021 - 2018) % 3);
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Typography variant="h4">Calendrier</Typography>

        <br />
        <Calendrier />
      </div>
    </ThemeProvider>
  );
}
