import { Box, Stack } from "@mui/material";
import { imageBoxStackContainers, imageBoxcard2, xreaMaretStudy } from "app";
import { React, useContext, useState } from "react";
import { SectionCard2 } from "shared/components/section-view/section-card-2";
import { LoadingContext } from "store2/loading-context-provider";
import { postMarketStudyMailSent } from "server/api/market-study-mail-sent";
import { orderMailConfig } from "user-config";
import { OpenLink } from "shared/utils";
import ContentWrapper from "shared/utils/layout/content-wrapper";

const redirect = () => {
  OpenLink("https://xrea.global/market-study");
};
export const OrderXrea = (props) => {
  const {
    companyName,
    userName,
    firstName,
    lastName,
    phoneNo,
    mailTo,
    mailfrom,
  } = orderMailConfig;
  const { loaderFunction, handleResponseMessage } = useContext(LoadingContext);
  const { startLoader, stopLoader } = loaderFunction;
  const { isDataSearched, cityList, useCaseList } = props;

  //console.log("isDataSearched1", props);
  const sentMail = async () => {
    const payLoad = {
      companyName: companyName,
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      phoneNo: phoneNo,
      cityList: cityList,
      caseList: useCaseList,
      mailTo: mailTo,
      mailfrom: mailfrom,
    };

    startLoader();

    const status = await postMarketStudyMailSent(payLoad);
    //const { statuscode } = data;
    //console.log("statuscode", statuscode);
    stopLoader();


    if (status === 200) {
      handleResponseMessage("We will get in touch shortly!");
    } else {
      stopLoader();
    }
  };

  const SectionCard2Props = {
    title: "Order an XREA Market Study",
    description:
      "If you’ve landed on a use and/or city for your next project, the Market Study is the next step to finalizing the highest & best use decision.",
    imageSection: (
      <Stack sx={imageBoxStackContainers}>
        <Box sx={imageBoxcard2}>
          <img
            src="/playground_assets/blueprint.svg"
            alt="image5144"
            className="frame-homepagewiththesearchbarandthetotallistofclu-image3"
          />
        </Box>
      </Stack>
    ),
    bgStyle: xreaMaretStudy,
    button: {
      buttonLable: "Contact Sales",
      handleClick: isDataSearched ? sentMail : redirect,
    },
  };
  return (
    <ContentWrapper>
      <SectionCard2 props={SectionCard2Props} />
    </ContentWrapper>
  )
};
