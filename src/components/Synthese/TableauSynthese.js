import React from "react";
import Button from "@material-ui/core/Button";
import { DataGrid, GridToolbar, frFR } from "@material-ui/data-grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useStateWithLocalStorage } from "../../utils/useStateWithLocalStorage";
import { initialValues } from "../../data/initialValues";
import { texteReservations } from "../Occupation/occupationMethods";
import { Occupation } from "../Occupation/Occupation";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";

const theme = createMuiTheme(frFR);

export default function TableauSynthese(props) {
  //const [data, setData] = useStateWithLocalStorage("data", initialValues);
  var history = useHistory();
  const { data } = props;

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
    },
    {
      headerName: " ",
      field: "edit",
      flex: 1,
      renderCell: params => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => history.push("/Occupation/" + params.value)}
        >
          Ouvrir
        </Button>
      )
    }
  ];

  const rows = [];
  data.map((item, index) => {
    let newRow = {};
    newRow.id = index;
    newRow.acr = item.acronyme;
    newRow.loge = item.loge;
    newRow.prog = texteReservations(item);
    newRow.edit = index;
    rows.push(newRow);
  });

  return (
    <>
      <Typography variant="h4">Tableau des loges</Typography>
      <br />
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
    </>
  );
}
