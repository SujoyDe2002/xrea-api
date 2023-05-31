import React, { useState, useContext, useEffect } from "react";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Helmet } from "react-helmet";
import {
  cardsContainer,
  headerItemsContainer,
  headerRightContiner,
  layoutContainer,
  loginFont,
  pageHeader,
  smallFont,
} from "app";
import { HomeDetails } from "./homeDetails";
import { SearchView } from "modules/search";
import { createTheme } from "@mui/material/styles";
import { LoadingContext } from "store2/loading-context-provider";
import { getLocalStorageItem, removeLocalStorageItems, setLocalStorageItem } from "shared/utils";
import { userInfo } from "user-config";
import { PricingContent } from "modules/pricing";
import ContentWrapper from "shared/utils/layout/content-wrapper";


export const HomeView = () => {
  const { userGetterSetter, searchGetterSetter } = useContext(LoadingContext);
  const { user, setUser } = userGetterSetter;
  const { receivedSearchResult, setReceivedSearchResult } = searchGetterSetter;

  const history = useHistory();
  const handleLogin = () => {
    const userId = userInfo.userId;
    const loginData = {
      userId
    };
    setUser(loginData);
    setLocalStorageItem("xrea", { loginData });
    history.push("/search");
  };
  const [disbled, setDisbled] = useState(false);
  //   const location = useLocation()
  // console.log("location", location);
  // useEffect(()=>{
  //   if (location.pathname !== "/search") {
  //     setDisbled(false)
  //   }
  // },[])
  // const tableBodyStyle = () =>
  //   createTheme({
  //     components: {
  //       MuiTable: {
  //         styleOverrides: {
  //           root: {
  //             padding: "8px",
  //             backgroundColor: "#CDCAC6",
  //             overflowX: "scroll",
  //           },
  //         },
  //       },
  //     },
  //   });
  // const test = {
  //   "& .tss-0:has(table)": {
  //     overflowX: "scroll",
  //   },
  // };
  const handleLogoClick = () => {
    console.log("getLocalStorageItem", getLocalStorageItem("xrea"));
    let userId = null;
    if (getLocalStorageItem("xrea")) {
      const { loginData } = getLocalStorageItem("xrea").data;
      userId = loginData?.userId;
    }

    if (userId) {
      setReceivedSearchResult(!receivedSearchResult);
    } else {
      history.push("/");
    }
  };
  const handleLogout = ()=>{
      setUser()
      removeLocalStorageItems(["xrea"])
      history.push("/")
  }
  //todo for temporary logout
  useEffect(() => {
      handleLogout();
  }, [])
  return (
    <Box sx={layoutContainer}>
      <Box
        sx={{
          width: "100%",
          padding: 0,
          position: "relative",
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        <Helmet>
          <title>XREA</title>
        </Helmet>
        <Box sx={pageHeader}></Box>
        <Box sx={cardsContainer}>
        <ContentWrapper>
            <Stack sx={headerItemsContainer}>
              <div className="frame-homepagewiththesearchbarandthetotallistofclu-group7">
                <Box
                  onClick={handleLogoClick}
                  className="frame-homepagewiththesearchbarandthetotallistofclu-group4"
                >
                  <img
                    src="/playground_assets/logo.svg"
                    alt="Rectangle4I120"
                    className="logo"
                  />
                  <Box></Box>
                </Box>
              </div>
              <Stack sx={headerRightContiner}>
                <Box mr={1}>
                  <img
                    src="/playground_assets/image2i120-7k5g-200h.png"
                    alt="image2I120"
                    className="frame-homepagewiththesearchbarandthetotallistofclu-image2"
                  />
                </Box>
                <Box>
                  <Typography sx={loginFont} component={"div"}>
                    {disbled ? (
                      <Box sx={{ cursor: "text" }}>{"Log In / Sign Up"}</Box>
                    ) : (
                      <Box sx={{ cursor: "pointer" }} onClick={handleLogin}>
                        {user ? `${userInfo.companyName}` : "Log In / Sign Up"}
                      </Box>
                    )}
                  </Typography>
                  <Typography sx={smallFont} component={"div"}>
                    {user ? `${userInfo.userName}` : "To unlock full access"}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
        </ContentWrapper>
       
          <Switch>
            <Route exact path="/">
              <HomeDetails setDisbled={setDisbled} />
            </Route>
            <Route exact path="/search">
              <SearchView setDisbled={setDisbled} />
            </Route>
            <Route exact path="/pricing">
              <PricingContent />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Box>
  );
};
