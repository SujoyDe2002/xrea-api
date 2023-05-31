import { Box, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppStyle, boxStyle, cellSize, itemTableDataCellStyle, marketSegmentHeaderStyle, marketSegmentHeading, stickyHeaderCell, tableHeader } from "app";
import { TableHeading } from "modules/search";
import { SegmentUsecaseTableRow } from "./segment-usecase-table-row";
import { GetAttribute } from "..";
import TooltipHelp from "../tooltip/tooltip-help";


const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    sticky: {
        position: "sticky",
        left: 0,
        //width: "300px"
    },
    tabcol: {
        padding: "16px",
        border: "5px solid #fff",
        borderRadius: "10px 10px 0px 0px",
        boxShadow: "0px -3px 17px -3px rgba(0, 0, 0, 0.1) inset",
        fontWeight: 700
    },
    tabcol1: {
        borderRadius: "5px 5px 0px 0px",
        boxShadow: "2px 0px 10px 0px #eeeeee"
    },
    tabcol3: {
        backgroundColor: "#1ca2aa"
    }
});
export const XreaTableRow = ({ rowData, noOfCol, getCityIndex }) => {
    const classes = useStyles();
    let colRow = new Array(noOfCol).fill(null);
    const headingRow = {
        "& th": {
            p: 0
        }
    }
    console.log("noOfCol", noOfCol);
    const test = "The United States Home Price to Income Ratio for 2021 is Roughly 3.54"
    return (
        <>
            {rowData && rowData.type === 1 &&
                (
                    <TableRow key={rowData.type}>
                        {
                            rowData.cols.map((v, i) => {
                                console.log("vasfasdf", v);
                                return (
                                    <TableCell
                                        align="center" 
                                        className={i === 0 ? classes.sticky : classes.tabcol}
                                        //width={{xs:"250px",md:"350px"}}
                                        style={{
                                            paddingLeft: 0, 
                                            backgroundColor: "#fff",
                                            ...cellSize
                                        }}
                                    >
                                        <Typography sx={marketSegmentHeading}>{v}</Typography>
                                        
                                    </TableCell>
                                )
                            })
                        }

                    </TableRow>
                )}
            {rowData && rowData.type === 2 &&
            (
                    <TableRow className={classes.sticky} sx={stickyHeaderCell} key={rowData.type} >
                        {
                            colRow.map((v, i) => {
                                return (

                                    <TableCell
                                        align="center"
                                        className={i === 0 && classes.sticky}
                                        // style={{width: "250px", paddingLeft: 0, backgroundColor: "#fff" }}
                                        style={{ paddingLeft: 0, backgroundColor: "#fff" }}
                                    >
                                        {i > 0 && <Box sx={boxStyle} indexid={i - 1} onClick={getCityIndex}></Box>}

                                        <Typography  sx={(i===0) ? marketSegmentHeaderStyle : marketSegmentHeading }>
                                            {rowData.cols[i]}
                                        </Typography>
                                      
                                    </TableCell>
                                )
                            })

                        }
                    </TableRow>
                )}
            {rowData && rowData.type === 3 &&
                (
                    <TableRow key={rowData.type} sx={{...headingRow, backgroundColor: AppStyle.palette.tableHeader.main}} className={classes.tabcol3}>
                        <TableCell
                            component="th"
                            scope="row"
                            colSpan={1}
                            className={classes.sticky}
                        >
                            <TableHeading heading={rowData.cols[0]} />

                        </TableCell>
                        <TableCell
                            component="th"
                            scope="row"
                            colSpan={noOfCol-1}
                        >
                            {/* <TableHeading heading={rowData.cols[0]} /> */}

                        </TableCell>
                    </TableRow>
                )}
            {rowData && rowData.type === 4 &&
                (
                    rowData.cols && rowData.cols.map(({ tableHeaderTitle, toolTip, groupData }, index) => {
                        return (

                            <TableRow key={index} >
                                <TableCell
                                    align="center"
                                    className={classes.sticky}
                                    style={{ paddingLeft: 0, backgroundColor: "#fff" }}
                                >
                                    {/* <Stack alignItems={"center"} sx={{width: "250px"}} ml={1} flexDirection={"row"}> */}
                                    <Stack justifyContent ={"right"} alignItems={"center"}  ml={1} flexDirection={"row"}>
                                        <Typography sx={tableHeader}>
                                            {tableHeaderTitle}
                                        </Typography>

                                        <TooltipHelp
                                            title={toolTip}

                                        />
                                    </Stack>
                                </TableCell>
                                {

                                    groupData.map((v, i) => {

                                        return (

                                            <TableCell
                                                align="center"
                                                style={{ paddingLeft: 0, backgroundColor: "#fff" }}
                                            >

                                                <Typography sx={itemTableDataCellStyle}>
                                                    {v}
                                                </Typography>
                                            </TableCell>
                                        )
                                    })

                                }
                            </TableRow>
                        )
                    })
                )}
            {rowData && rowData.type === 5 &&
                (
                    <TableRow key={rowData.type} sx={{...headingRow,  backgroundColor: AppStyle.palette.tableHeader.main}} className={classes.tabcol3} >
                        <TableCell
                            component="th"
                            scope="row"
                            colSpan={1}
                            className={classes.sticky}
                        >
                            <TableHeading heading={rowData.cols[0]} />

                        </TableCell>

                        <TableCell
                            component="th"
                            scope="row"
                            colSpan={noOfCol - 1}
                        >                     
                        </TableCell>
                    
                    </TableRow>
                )}
            {rowData && rowData.type === 6 &&
                (
                    <SegmentUsecaseTableRow rowData={rowData.cols} />
                )}
        </>);
}