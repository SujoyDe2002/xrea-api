import { React, useRef, useContext, useEffect, useCallback } from "react";
import ScrollContainer from 'react-indiana-drag-scroll';
import {
  ArrangeSearchData,
  SectionSearchCard,
  getLocalStorageItem,
  setLocalStorageItem,
} from "shared/utils";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  input,
  searchResultSection,
  tablesContainter,
} from "app";
import { SearchSectionHeading } from "./search-section-heading";
import AlertDialog from "shared/utils/dialog/alert-dialog";
import { useState } from "react";
import Button1 from "shared/utils/button/button1";
import Button2 from "shared/utils/button/button2";
import { postSearchDetails } from "server/api/save-search";
import { LoadingContext } from "store2/loading-context-provider";
import BrightTooltip from "shared/utils/tooltip/bright-tooltiip";
import { XreaTable } from "shared/utils/data-table/xrea-table";

const SearchReasult = ({ searchReasultProps }) => {
  const { loaderFunction, handleResponseMessage, searchTitleGetterSetter } =
    useContext(LoadingContext);
  const { searchTitle, setSearchTitle } = searchTitleGetterSetter
  const { startLoader, stopLoader } = loaderFunction;
  const [showDialog, setShowDialog] = useState(false);
  const [searchName, setSearchName] = useState();
  const [userId, setUserId] = useState();
  const [noOfsearch, setNoOfsearch] = useState(
    getLocalStorageItem("xrea")?.data?.noOfsearch
  );
  const { searchedReasult, cityNameResultList, getCityIndex, xreSearchDisable, setXreSearchDisable, xreaTableRows, xreaSeachButtonTitle, setXreSearchButtonTitle, setSearchCriteria } = searchReasultProps;
  const { general_stat, usecase, marketSegment } = searchedReasult;
  const theme = useTheme();
  console.log("xreaTableRows", xreaTableRows);
  // let [xreaTableRows, setXreaTableRows] = useState([])
  useEffect(() => {
    const logdata = getLocalStorageItem("xrea")?.data;
    const maxSavedLength = logdata?.maxSavedLength;
    const userId = logdata?.loginData?.userId;
    const isdisabled = logdata?.isdisabled;
    setUserId(userId);
    if (userId && !isdisabled) {
      if (noOfsearch >= maxSavedLength) {
        setXreSearchButtonTitle("Saved searches limit exceeded");
        setXreSearchDisable(true);
      }
    } else {
      setXreSearchButtonTitle("Save this XREA Search");
      setXreSearchDisable(true);
    }
    return () => {
      setSearchTitle()
    }
  }, [noOfsearch]);
  useEffect(() => {
    setSearchCriteria()
  }, [])

  // useEffect(() => {
  //   console.log("cityNameResultList", cityNameResultList);
  //   const searchResultRowData = ArrangeSearchData({
  //     CityData: [cityNameResultList],
  //     GeneralStat: [general_stat],
  //     UseCases: [usecase],
  //     MarketSegmentData: [marketSegment.data]
  //   })
  //   console.log("usecase", usecase);
  //   setXreaTableRows(searchResultRowData)
  // }, [searchedReasult])

  const secondarybtn = {
    textTransform: "none",
    bgcolor: theme.palette.secondary.main,
    fontWeight: 700,
    fontSize: "1.125rem",
    lineHeight: "107.5%",
  };

  const openDialog = () => {
    setShowDialog(true);
  };
  const closeDialog = () => {
    setShowDialog(false);
  };
  const openSaveSearch = () => {
    openDialog();
  };
  const saveSearch = async () => {

    const xreaData = getLocalStorageItem("xrea")?.data;
    const { userId } = xreaData.loginData;
    const citits = cityNameResultList.map(({ name, id }) => {
      return {
        geographic_area_name: name,
        geoId: id,
      };
    });
    const usecases = usecase.label.map(
      ({ use_case_group, use_case_group_desc, use_case_color }) => {
        return {
          code: use_case_group,
          name: use_case_group_desc,
          color: use_case_color,
        };
      }
    );
    const payLoad = {
      name: searchName,
      user_id: userId,
      city: citits,
      usecase: usecases,
    };
    closeDialog();
    startLoader();
    const { status, data } = await postSearchDetails(payLoad);
    stopLoader();
    console.log("Status : " + status);
    //const { statuscode, noOfSavedSearch } = data;
    let noOfSavedSearch = data.saveSearchCount;
    if (status === 200) {
      handleResponseMessage("Search saved successfully!");
      const noOfSearch = Number(noOfSavedSearch);
      setLocalStorageItem("xrea", { ...xreaData, noOfsearch });
      setNoOfsearch(noOfSearch);
    }
  };
  const button1Props = {
    title: "Save",
    handleClick: saveSearch,
  };
  const button2Props = {
    title: "Cancel",
    handleClick: closeDialog,
  };
  const AlertDialogProps = {
    title: "Save XREA search",
    dialogContent: (
      <TextField
        error={false}
        id="date"
        placeholder="Enter Name of your search"
        type="text"
        sx={input}
        onChange={(e) => setSearchName(e.target.value)}
        value={searchName}
        InputLabelProps={{
          shrink: true
        }}
      />
    ),
    dialogAction: {
      button1: <Button2 props={button2Props} />,
      button2: <Button1 props={button1Props} />
    },
    actionsOnUnMount: function (params) {
      setSearchName()
    }
  };
  const xreaTooltipTitle =
    "You have exceeded the limit of saved searches. Please delete older searches before saving new ones.";
  return (
    <SectionSearchCard>
      <SearchSectionHeading>
        {console.log("searchTitle", searchTitle)}
        <Typography variant="h2" sx={searchResultSection}>
          {searchTitle ? searchTitle : "Search results"}
        </Typography>
        {xreSearchDisable && userId ? (
          <BrightTooltip title={xreaTooltipTitle} placement="bottom" arrow>
            <span>
              <Button
                variant="contained"
                sx={secondarybtn}
                onClick={openSaveSearch}
                disabled={xreSearchDisable}
              >
                {xreaSeachButtonTitle}
              </Button>
            </span>
          </BrightTooltip>
        ) : (
          <Button
            variant="contained"
            sx={secondarybtn}
            onClick={openSaveSearch}
            disabled={xreSearchDisable}
          >
            {xreaSeachButtonTitle}
          </Button>
        )}
      </SearchSectionHeading>
      <Box sx={tablesContainter}>
        {/* <Box onClick={getCityIndex}>ss</Box> */}
        <ScrollContainer >
          <XreaTable rows={xreaTableRows} getCityIndex={getCityIndex} />
        </ScrollContainer>
      </Box>
      {showDialog && <AlertDialog props={AlertDialogProps} />}

    </SectionSearchCard>
  );
};

export default SearchReasult;
