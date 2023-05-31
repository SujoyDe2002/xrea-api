import { DetailSection, removeLocalStorageItems } from "shared/utils";
import React, { useContext } from "react";
import {
  InfoCard,
  InsightCard,
  OnlyResponsible,
  Methodology,
} from "shared/components/";
import { useEffect } from "react";
import { SectionCard2 } from "shared/components/section-view/section-card-2";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  barImgContainer,
  buttonStyle,
  card2BuronContainer,
  iconContainer,
  smallTextStyle,
  xreaBgStyle,
  xreaButtonContainer,
} from "app";
import { LoadingContext } from "store2/loading-context-provider";
import { useHistory } from "react-router-dom";


export const HomeDetails = ({ setDisbled }) => {
  const { userGetterSetter } = useContext(LoadingContext);
  const { setUser } = userGetterSetter;
  useEffect(() => {
    setDisbled(false);
    console.log("sfdffd");

    removeLocalStorageItems(["xrea"]);
    setUser(false);
    console.log("sfdffd");
    console.log("sfdffd");
  }, []);


  return (
    <DetailSection>
      <div>
        <InfoCard />
        <br />
        <br />

        <InsightCard />
        <br />
        <br />

        <OnlyResponsible />

        <br />
        <br />
        <Methodology />
        <br />
        <br />
      </div>
    </DetailSection>
  );
};
