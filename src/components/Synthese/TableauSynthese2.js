import React from "react";
import { DataGrid, GridToolbar, frFR } from "@material-ui/data-grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useStateWithLocalStorage } from "../../utils/useStateWithLocalStorage";
import { initialValues } from "../../data/initialValues";
import { texteReservations } from "../Occupation/occupationMethods";

const theme = createMuiTheme(

  frFR
);

const columns = [
  {
    headerName: "Acronyme",
    field: "acr",
    width: 120
  },
  {
    headerName: "Loge",
    field: "loge",
    flex: 2
  },
  {
    headerName: "Programme",
    field: "prog",
    flex: 5
  }
];

const rows = [];
initialValues.map((item, index) => {
  let newRow = {};
  newRow.id = index;
  newRow.acr = item.acronyme;
  newRow.loge = item.loge;
  newRow.prog = texteReservations(item);
  rows.push(newRow);
});

export default function TableauSynthese() {
  //const [data, setData] = useStateWithLocalStorage("data", initialValues);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: 1000, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          components={{
            Toolbar: GridToolbar
          }}
          disableDensitySelector
          disableColumnSelector
        />
      </div>
    </ThemeProvider>
  );
}
