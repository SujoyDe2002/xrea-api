import { React, useRef } from 'react'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import jsPDF from 'jspdf';
import {GeneralStat, UseCaseTable,TableHeading,MarketSegmentRow}from './search-result-grid';

import { cityContainer, lastTab, searchResultSection, tabStyle, tablesContainter } from 'app';



export const ResultList = ({ searchReasultProps }) => {


    const { searchedReasult, cityNameResultList, setMarketSegmentData } = searchReasultProps
    const { generalStat, usecase } = searchedReasult;
    const theme = useTheme();
    const secondarybtn = {
        textTransform: "none",
        bgcolor: theme.palette.secondary.main,
        fontWeight: 700,
        fontSize: "1.125rem",
        lineHeight: "107.5%"
        /* or 19px */
    }
    const resultTableRef = useRef();
    const downLoadReport = (e) => {
        const doc = new jsPDF({
            orientation: 'l',
            unit: 'pt',
            format: 'letter'
        });
        doc.html(resultTableRef.current, {
            callback: function (doc) {
                doc.save();
            }
        });
    }

    const marketSegmentProps = {

        rowLength: generalStat.data.length,


    }



    return (
        <>
            <Stack mt={5} flexDirection={"row"} justifyContent={"space-between"} width={"100%"} p={".5rem 1rem"}>
                <Typography variant='h2' sx={searchResultSection}>Search results</Typography>
                <Button variant='contained' sx={secondarybtn} onClick={(e) => downLoadReport(e)}>Save this XREA Search</Button>
            </Stack>
            <Box ref={resultTableRef} sx={tablesContainter}>

                <Stack ml={"320px"} direction={"row"} justifyContent={"start"} spacing={2}>

                    {/* <Box sx={tabStyle}>
                        {"Test"}
                    </Box>
                    <Box sx={tabStyle}>
                        {"Test"}
                    </Box> */}
                    {console.log("cityNameResultList", cityNameResultList)}
                    {(cityNameResultList.map((city) => {
                        return (
                            <Box sx={tabStyle}>
                                {city.name}
                            </Box>
                        )
                    }))}
                    <Box sx={lastTab}>
                        {"Add a city..."}
                    </Box>

                </Stack>
                {/* <Grid container spacing={0} p={"1.2rem"}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={9}>
                        <Stack direction={"row"} justifyContent={"start"} spacing={2}>
                            {(cityNameResultList.map((city) => {
                                return (
                                    <Box sx={cityContainer}>
                                        {city.name}
                                    </Box>
                                )
                            }))}
                        </Stack>
                    </Grid>
                </Grid> */}

                <MarketSegmentRow marketSegmentProps={marketSegmentProps} />

                {/* <GeneralStat rows={generalStat} /> */}
                <TableHeading heading={"GENERAL STATISTICS"} />
                <GeneralStat rows={generalStat} />
                <TableHeading heading={"USE CASE SCORE"} />
                <UseCaseTable rows={usecase} />
            </Box>
        </>
    )
}

