import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { theme, useStyles } from "./styles/styles";
import Calendrier from "./components/Calendrier/Calendrier";
import Occupation from "./components/Occupation/Occupation";
import TableauSynthese from "./components/Synthese/TableauSynthese";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { initialValues } from "./data/initialValues";

export default function App() {
  const [data, setData] = React.useState(initialValues);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/TableauSynthese"
            render={() => <TableauSynthese data={data} />}
          />
          <Route
            path="/Occupation/:id"
            render={props => (
              <Occupation
                data={data}
                setData={setData}
                id={props.match.params.id}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}
