import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  sticky: {
    position: "sticky",
    left: 0,
    background: "white",
    // boxShadow: "5px 2px 5px grey",
    // borderRight: "0px solid white"
    
  },
  tabcol: {
    border: '1px solid red'
  }
});

function createData(
  name,
  calories,
  fat,
  carbs,
  protein,) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

export default function DataTable() {
  const classes = useStyles();

  return (
    <>
      <TableContainer style={{ border: "1px solid white" }}>
        <Table
          className={classes.table}
          aria-label="simple table"
          style={{ tableLayout: "fixed" }}
        >
          <TableHead>
            <TableRow>
              <TableCell ></TableCell>
              <TableCell align="center" className={classes.tabcol}>
                In
              </TableCell>
              <TableCell align="center" className={classes.tabcol}>
                Out
              </TableCell>
              <TableCell align="center" className={classes.tabcol}>
                Out
              </TableCell>
              <TableCell align="center">
                Out
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.sticky}>
                {/* Dessert (100g serving) */}
              </TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  className={classes.sticky}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ margin: "40px", textAlign: "center" }}>
        <a
          target="_blank"
          href="https://smartdevpreneur.com/create-a-material-ui-table-sticky-column-in-only-three-lines-of-code/"
        >
          Read more about Material-UI Sticky Column here
        </a>
      </div>
    </>
  );
}
