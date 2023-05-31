import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { TableContainer, TableBody, Table } from "@mui/material";
import { XreaTableRow } from "./xrea-table-row";


const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

function createData(
    catg_name,
    catg_values,
    // catg_value1,
    // catg_value2,
    type
) {
    return { catg_name, catg_values, type };
}

// const rows = [
//     createData("", "Ayer CDP Massachusetts", "Ayr Village, Nebaraska", "Value test", 1),
//     createData("Market Segment", "Market Segment1", "Market Segment2", "", 2),
//     createData("General Statistics", "", "", "", 3),
//     createData("Cupcake", 305, 3.7, 67, 4),
//     createData("Gingerbread", 356, 16.0, 49, 4),
//     createData("USE CASE SCORES", "", "", "", 3),
//     createData("Most affortable", 305, 3.7, 67, 5),
//     createData("Most affortable", 356, 16.0, 49, 5)
// ];

export const XreaTable = ({ rows, getCityIndex }) => {
    const classes = useStyles();
    const collength = Math.max(...rows.map(el => el['cols'] && el.type == 1 && el['cols'].length));
    console.log('collength', collength)
    return (
        <TableContainer style={{ paddingTop: "2px" }}>
            <Table
                className={classes.table}
                aria-label="simple table"
                style={{ tableLayout: "fixed" }}
            >
                <TableBody>

                    {
                        rows && Array.isArray(rows) && rows.map((row, index) => (
                            <XreaTableRow key={index} rowData={row} noOfCol={collength} getCityIndex={getCityIndex} />
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}