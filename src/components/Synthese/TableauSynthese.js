import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "../../styles/styleTableCell";
import Paper from "@material-ui/core/Paper";
import Select from "../../styles/styleSelect"
import { Select, MenuItem } from "@material-ui/core";
import { useTable, useFilters, useGlobalFilter } from "react-table";

export default function TableauSynthese(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Acronyme",
        accessor: "acr",
        Filter: SelectColumnFilter,
        filter: "includes"
      },
      {
        Header: "Loge",
        accessor: "loge",
        Filter: SelectColumnFilter,
        filter: "includes"
      },
      {
        Header: "Programme",
        accessor: "prog",
        Filter: SelectColumnFilter,
        filter: "includes"
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

  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter }
  }) {
    const count = preFilteredRows.length;

    return (
      <Input
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined);
        }}
      />
    );
  }

  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id }
  }) {
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach(row => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);

    return (
      <Select
        value={filterValue}
        color="#fff"
        onChange={e => {
          setFilter(e.target.value || undefined);
        }}
      >
        <MenuItem color="#fff" value="">All</MenuItem>
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    );
  }

  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell className="header" {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
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
                    <TableCell className="row" {...cell.getCellProps()}>
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
