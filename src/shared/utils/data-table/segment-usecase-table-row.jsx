import { makeStyles } from "@mui/styles";
import { Box, darken, lighten, Stack, TableCell, TableRow, Typography } from '@mui/material'
import { AppStyle, blankTableCell, itemTableDataCellStyle, itemTableDataCellStyleBold, maxIndexValue, stickyHeaderCell, tableCell, tableCellValue, tableHeader, tableHeaderCell } from 'app'
import React from 'react'


const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    sticky: {
        position: "sticky",
        left: 0
    },
    tabcol: {
        borderRadius: "5px 5px 0px 0px",
        boxShadow: "2px 0px 10px 0px #eeeeee",
        margin: "0px 5px 0px 5px"
    },
    tabcol1: {
        borderRadius: "5px 5px 0px 0px",
        boxShadow: "2px 0px 10px 0px #eeeeee"
    },
    tabcol3: {
        backgroundColor: "#1ca2aa"
    }
});


export const SegmentUsecaseTableRow = ({ rowData }) => {
    const classes = useStyles();
    return (
        <>
            {rowData?.map(({ use_case_group_desc, groupData, use_case_color }, index) => {
                console.log("use_case_color", use_case_color);
                return (
                    <TableRow key={index}>

                        <TableCell
                            className={classes.sticky}
                            component="td"
                            align="right"
                            style={{ paddingLeft: 0, backgroundColor: "#fff" }}
                        >
                            <Typography sx={{ ...tableHeader, color: use_case_color }}>
                                {use_case_group_desc}
                            </Typography>
                        </TableCell>
                        {groupData && groupData.map(({ value, isMax }, index) => {
                            let bgcolor = isMax ? lighten(use_case_color, .90) : AppStyle.palette.common.white;
                            return (
                                <TableCell key={index} align="center" >
                                    <Stack flexDirection={"row"} justifyContent={"center"}>

                                        <Typography
                                            sx={{
                                                ...itemTableDataCellStyleBold,
                                                color: use_case_color,
                                                // width: "200px",
                                                padding: "10px 50px",
                                                borderRadius: "25px",
                                                backgroundColor: bgcolor
                                            }}>
                                            {value}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                            )
                        })}
                    </TableRow>
                )

            })}
        </>
    )
}

