import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "../../styles/styleTableCell";
import Paper from "@material-ui/core/Paper";
import { useTable } from "react-table";

const columns = React.useMemo(
  () => [
    {
      Header: "Acronyme",
      accessor: "acr"
    },
    {
      Header: "Loge",
      accessor: "loge"
    },
    {
      Header: "Programme",
      accessor: "prog"
    }
  ],
  []
);

const data = React.useMemo(
  () => [
    {
      acr: "LBF",
      loge: "La Bonne Foi",
      prog: "1er mardi, bla bla"
    },
    {
      acr: "LCE",
      loge: "Le Chardon Ecossais",
      prog: "1er mercredi"
    }
  ],
  []
);

export function TableauSynthese() {
  const tableInstance = useTable({
    columns,
    data
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;

  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell className="jour" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell className="jour" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
