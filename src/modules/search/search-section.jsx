import { Grid } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { React, useState, useEffect, useContext } from "react";
import {
  AutoCompleteSelect,
  updateLocalStorage,
} from "shared/utils";
import {
  AppStyle,
  clearLinkStyle,
  disable,
  searchButtonContainer,
  searchButtonStyle,
  searchContainter,
} from "app";
import { getCityList } from "server/api/get-citylist";
import { getUseCaseList } from "server/api/get-usecase-list";
import Button1 from "shared/utils/button/button1";
import { LoadingContext } from "store2/loading-context-provider";

const SearchSection = ({
  searchCriteria,
  tableActive,
  setCityList,
  cityList,
  selectedUseCaseList,
  selectedCityList,
  searchFunction,
  handleClear,
  setSelectedCityList,
  setSelectedUseCaseList,
  setXreSearchDisable,
  xreaSeachButtonTitle
}) => {
  const { searchTitleGetterSetter } = useContext(LoadingContext);
  const { searchTitle, setSearchTitle } = searchTitleGetterSetter;

  const [useCaseList, setUseCaseList] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [savedCityList, setSavedCityList] = useState([]);
  const [savedUseCaseList, setSavedUseCaseList] = useState([]);
  console.log("searchCriteria11111111", searchCriteria);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { data } = await getUseCaseList();
      if (isMounted) setUseCaseList(data);
      if (searchCriteria?.city) {
        setSelectedCityList(searchCriteria?.city);
        setSavedCityList(searchCriteria?.city);
        if (searchCriteria?.useCase) {
          setSelectedUseCaseList(searchCriteria.useCase);
          setSavedUseCaseList(searchCriteria.useCase);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [searchCriteria]);

  useEffect(() => {
    //  console.log("selectedCityList", selectedCityList);

    if (searchCriteria?.city && selectedCityList?.length > 0) {
      updateLocalStorage("xrea", { isdisabled: true })
      if (!searchTitle) {
        setDisabled(true);
      } else {
        setDisabled(false);

      }
      searchFunction();
      console.log("inside search");
    }
  }, [selectedCityList, selectedUseCaseList]);

  const handleChangeCity = async (e) => {
    console.log("handleChangeCity");

    const { value } = e.currentTarget;
    if (value.length >= 2) {
      const { data } = await getCityList(value);
      // console.log("cityList", data);
      setCityList(data);
      console.log("cityList", cityList);
    }

  };
  let autoCompleteSelectPropsCity = {
    headerName: "Location (city, state)",
    tableActive,
    multiSelectInputList: cityList,
    setSelectedList: setSelectedCityList,
    selectedList: selectedCityList,
    setSavedList: setSavedCityList,
    savedList: savedCityList,
    list: true,
    handleChange: handleChangeCity,
  };
  let autoCompleteSelectPropsUseCase = {
    headerName: "Use case",
    tableActive,
    multiSelectInputList: useCaseList,
    setSelectedList: setSelectedUseCaseList,
    selectedList: selectedUseCaseList,
    setSavedList: setSavedUseCaseList,
    savedList: savedUseCaseList,
    list: false,
  };
  // console.log("selectedCityList", selectedCityList);
  // console.log("selectedUseCaseList", selectedUseCaseList);
  const handleClickOnSearch = () => {
    setSearchTitle();
    if (xreaSeachButtonTitle == "Save this XREA Search") {
      setXreSearchDisable(false);
    }
    searchFunction();
  }
  const button1Props = {
    title: "Search",
    handleClick: handleClickOnSearch,
    disabled,
    style: {
      bgcolor: disabled ? "#cccccc" : AppStyle.palette.primary.main,
    },
  };
  return (
    <Box sx={searchContainter}>
      <Grid container spacing={1}>
        <Grid item xs={5.25}>
          <AutoCompleteSelect props={autoCompleteSelectPropsCity} />
        </Grid>
        <Grid item xs={5.25}>
          <AutoCompleteSelect props={autoCompleteSelectPropsUseCase} />
        </Grid>
        <Grid item xs={1.5}>
          <Stack sx={searchButtonContainer}>
            <Box sx={searchButtonStyle}>
              <Button1 props={button1Props} />
              {disabled ? (
                <Box variant="contained" sx={{ ...clearLinkStyle, ...disable }}>
                  Clear search
                </Box>
              ) : tableActive ? (
                <Box
                  variant="contained"
                  sx={clearLinkStyle}
                  onClick={handleClear}
                >
                  Clear search
                </Box>
              ) : null}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchSection;
