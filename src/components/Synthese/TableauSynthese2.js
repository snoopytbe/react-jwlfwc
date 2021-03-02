import React from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";

const columns = [
  {
    headerName: "Acronyme",
    field: "acr",
    width: 150
  },
  {
    headerName: "Loge",
    field: "loge",
    width: 150
  },
  {
    headerName: "Programme",
    field: "prog",
    width: 150
  }
];

const rows = [
  {
    id: 1,
    acr: "LBF",
    loge: "La Bonne Foi",
    prog: "1er mardi"
  },
  {
    id: 2,
    acr: "LCE",
    loge: "Le Chardon Ecossais",
    prog: "1er mercredi"
  }
];

export default function TableauSynthese() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar
        }}
      />
    </div>
  );
}
