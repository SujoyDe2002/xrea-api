import { Box, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blankTableCell, boxStyle, itemTableDataCellStyle, marketSegmentHeading, stickyHeaderCell, tabStyle, tableCell, tableHeader, tableHeaderCell, tableRow } from "app";
import { TableHeading } from "modules/search";
import TooltipHelp from "../tooltip/tooltip-help";


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

// const tableRow = {
//     "& td, th": {
//         border: "none"
//     },
//     "& tr": {
//         border: "1px solid rgba(224, 224, 224, 1)"
//     }
// }
export const XreaTableRow = ({ rowData }) => {
    const classes = useStyles();
    const headingRow = {
        "& th": {
            p: 0
        }
    }
    return (<>
        {rowData.type === 1 &&
            (
                <TableRow key={rowData.name}>
                    <TableCell
                        className={classes.sticky}
                        component="th"
                        scope="row"
                        sx={{ wordWrap: "break-word", ...blankTableCell, }}
                    >
                        <Box sx={{ ...blankTableCell }}>

                            {rowData.catg_name}
                        </Box>
                    </TableCell>
                    {rowData?.catg_values?.map((value)=>{

                    <TableCell align="center" >
                        <Box sx={blankTableCell}>

                            <Box sx={{ ...tabStyle, width: "80%" }}>
                                {value}
                            </Box>
                        </Box>
                    </TableCell>
                    })}
                    {/* <TableCell align="center" >
                        <Box sx={blankTableCell}>

                            <Box sx={{ ...tabStyle, width: "80%" }}>
                                {rowData.catg_value1}
                            </Box>
                        </Box>
                    </TableCell> */}
                    {/* <TableCell align="center" className={classes.tabcol}>{rowData.catg_value2}</TableCell>
                    <TableCell align="center" className={classes.tabcol}>{rowData.type}</TableCell> */}
                </TableRow>
            )}
        {rowData.type === 2 &&
            (
                <TableRow className={classes.sticky} sx={stickyHeaderCell} key={rowData.name} >
                    <TableCell
                        className={classes.sticky}
                        component="th"
                        scope="row"
                        align="right"
                        sx={{ ...blankTableCell, ...stickyHeaderCell }}
                    >
                        <Box sx={{ ...tableCell, ...tableHeader }}>

                            {rowData.catg_name}
                        </Box>
                    </TableCell>

                    <TableCell align="center" sx={{ ...blankTableCell }}>
                        <Box sx={tableCell}>
                            <Box>
                                <Box sx={boxStyle}></Box>
                                <Typography sx={marketSegmentHeading}>{rowData.catg_value}</Typography>
                            </Box>
                        </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ ...blankTableCell }}>
                        <Box sx={tableCell}>
                            <Box>
                                <Box sx={boxStyle}></Box>
                                <Typography sx={marketSegmentHeading}>{rowData.catg_value1}</Typography>
                            </Box>
                        </Box>
                    </TableCell>
                    {/* <TableCell align="center" sx={{ ...blankTableCell }}>
                        <Box sx={tableCell}>
                            <Box>
                                <Box sx={boxStyle}></Box>
                                <Typography sx={marketSegmentHeading}>{rowData.catg_value2}</Typography>
                            </Box>
                        </Box>
                    </TableCell> */}
                    {/* <TableCell align="right">{rowData.catg_value2}</TableCell>
                    <TableCell align="right">{rowData.type}</TableCell> */}
                </TableRow>
            )}
        {rowData.type === 3 &&
            (
                <TableRow key={rowData.name} sx={headingRow} className={classes.tabcol3}>
                    <TableCell
                        className={classes.sticky}
                        component="th"
                        scope="row"
                        colSpan={5}
                        sx={{...stickyHeaderCell}}
                    >


                        <TableHeading heading={rowData.catg_name} />


                    </TableCell>

                </TableRow>
            )}
        {rowData.type === 4 &&
            (
                <TableRow key={rowData.name}>
                    <TableCell
                        className={classes.sticky}
                        component="th"
                        scope="row"
                        align="right"
                        sx={{ ...blankTableCell, ...stickyHeaderCell }}
                    >
                        <Stack sx={{ ...tableHeaderCell, }}>

                            <Box sx={tableHeader}>
                                {rowData.catg_name}
                                <Stack alignItems={"center"} ml={1}>
                                    <TooltipHelp
                                        title={
                                            "The United States 10-year Population Growth Rate from 2011-2021 was 7.54%"
                                        }
                                    />
                                </Stack>
                            </Box>
                        </Stack>
                    </TableCell>
                    <TableCell align="right" sx={{ ...blankTableCell }}>
                        <Box sx={tableCell}>
                            <Typography sx={itemTableDataCellStyle}> {rowData.catg_value}</Typography>
                        </Box>

                    </TableCell>
                    <TableCell align="right" sx={{ ...blankTableCell }}>
                        <Box sx={tableCell}>
                            <Typography sx={itemTableDataCellStyle}> {rowData.catg_value1}</Typography>
                        </Box>

                    </TableCell>
                </TableRow>
            )}
        {rowData.type === 5 &&
            (
                <TableRow key={rowData.name}>
                    <TableCell
                        className={classes.sticky}
                        component="th"
                        scope="row"
                        align="right"
                        sx={{ ...blankTableCell, ...stickyHeaderCell }}
                    >
                        <Stack sx={{ ...tableHeaderCell, }}>

                            <Box sx={tableHeader}>
                                {rowData.catg_name}
                            </Box>
                        </Stack>
                    </TableCell>
                    <TableCell align="right" sx={{ ...blankTableCell }}>
                        <Box sx={tableCell}>
                            <Typography sx={itemTableDataCellStyle}> {rowData.catg_value}</Typography>
                        </Box>

                    </TableCell>
                    <TableCell align="right" sx={{ ...blankTableCell }}>
                        <Box sx={tableCell}>
                            <Typography sx={itemTableDataCellStyle}> {rowData.catg_value1}</Typography>
                        </Box>

                    </TableCell>
                </TableRow>
            )}
    </>);
}