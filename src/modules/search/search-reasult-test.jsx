import { React, useRef } from 'react'
import { SectionSearchCard, getLocalStorageItem } from 'shared/utils'
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import jsPDF from 'jspdf'
import { GeneralStat, UseCaseTable, MarketSegmentRow, TableHeading } from './search-result-grid';
import { input, searchResultSection, tabRight, tabStyle, tablesContainter } from 'app';
import { SearchSectionHeading } from './search-section-heading';
import AlertDialog from 'shared/utils/dialog/alert-dialog';
import { useState } from 'react';
import Button1 from 'shared/utils/button/button1';
import Button2 from 'shared/utils/button/button2';
import Demo from './demo';
import DataTable from 'shared/utils/data-table/DataTable';


const SearchReasultTest = ({ searchReasultProps }) => {

    const [showDialog, setShowDialog] = useState(false);
    const { searchedReasult, cityNameResultList, getCityIndex } = searchReasultProps
    const { generalStat, usecase } = searchedReasult;
    const theme = useTheme();
    const secondarybtn = {
        textTransform: "none",
        bgcolor: theme.palette.secondary.main,
        fontWeight: 700,
        fontSize: "1.125rem",
        lineHeight: "107.5%"
    }
    const resultTableRef = useRef();
    const marketSegmentProps = {

        rowLength: generalStat.data.length,
        getCityIndex
    }
    const openDialog = () => {
        setShowDialog(true);
    }
    const closeDialog = () => {
        setShowDialog(false);
    }
    const openSaveSearch = () => {
        openDialog();

    }
    const saveSearch = () => {
        closeDialog();
    }
    const button1Props = {
        title: "Save",
        handleClick: saveSearch
    }
    const button2Props = {
        title: "Cancel",
        handleClick: closeDialog
    }
    const AlertDialogProps = {
        title: "Save XREA search",
        dialogContent:
            <TextField
                error={false}
                id="date"
                placeholder="Enter Name of your search"
                type="text"
                sx={input}
                InputLabelProps={{
                    shrink: true,
                }}
            />,
        dialogAction: {
            button1: <Button2 props={button2Props} />,
            button2: <Button1 props={button1Props} />
        }

    }
    const data = generalStat.data.map((e) => {
        return Object.values(e)

    })
    console.log("data", data);
    const test = {
        width: "100%",
        "& .tss-0:has(table)": {
            overflowX: "scroll"
        }
    }



    return (
        <SectionSearchCard>
            <SearchSectionHeading>

                <Typography variant='h2' sx={searchResultSection}>Search results</Typography>
                <Button variant='contained' sx={secondarybtn} onClick={openSaveSearch}>Save this XREA Search</Button>

            </SearchSectionHeading>
            <Box ref={resultTableRef} sx={tablesContainter}>

                <Stack direction={"row"} justifyContent={"start"} spacing={2}>

                    <Box sx={tabRight}></Box>
                    {console.log("cityNameResultList", cityNameResultList)}
                    {(cityNameResultList.map((city) => {
                        return (
                            <Box sx={tabStyle}>
                                {city.name}
                            </Box>
                        )
                    }))}

                </Stack>
                <MarketSegmentRow marketSegmentProps={marketSegmentProps} />
                <TableHeading heading={"GENERAL STATISTICS"} />
                <GeneralStat rows={generalStat} />
                <TableHeading heading={"USE CASE SCORE"} />
                <UseCaseTable rows={usecase} />
            </Box>
            {showDialog && <AlertDialog props={AlertDialogProps} />}
            <Box sx={test}>

                {/* <Demo /> */}
                <DataTable />
            </Box>

        </SectionSearchCard>
    )
}

export default SearchReasultTest
