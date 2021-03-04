import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { theme, useStyles } from "./styles/styles";
import Calendrier from "./components/Calendrier/Calendrier";
import Occupation from "./components/Occupation/Occupation";
import TableauSynthese from "./components/Synthese/TableauSynthese";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { useRoutes } from "hookrouter";

const routes = {
  "/TableauSynthese": () => <TableauSynthese />,
  "/Occupation": () => <Occupation />
};

export default function App() {
  //const classes = useStyles();
  const routeResult = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className={classes.root}>
          <Typography variant="h4">
            <Link to="/TableauSynthese">Synthese</Link>
          </Typography>
          <Typography variant="h4">
            <Link to="/Occupation">Occupation</Link>
          </Typography>
          <br />
        </div>
        <div>
          <Switch>
            <Route path="/TableauSynthese" children={<TableauSynthese />} />
            <Route path="/Occupation" component={Occupation} />
          </Switch>
        </div>
      </BrowserRouter>
      
    </ThemeProvider>

  );
  return routeResult;
}
