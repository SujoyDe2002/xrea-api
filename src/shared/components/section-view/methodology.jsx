import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { SectionCard } from ".";
import { useTheme } from "@mui/material/styles";
import {
  buttonStyle,
  xreDes,
  xreaBgStyle,
  barImgContainer,
  iconContainer,
  smallTextStyle,
  xreaTitleStyle,
  xreaButtonContainer,
  card2BuronContainer,
  imageBoxStackContainers,
} from "app";
import { SectionCard2 } from "./section-card-2";
import { useHistory } from 'react-router-dom';
export const Methodology = ({ children }) => {
  const theme = useTheme();
  const iconStyle = {
    color: theme.palette.primary.main,
    fontSize: "3rem",
  };
  let history = useHistory();
  const goToPricing = () => {
    history.push("/pricing");
  }
  const sectionCard2Props = {
    title: "XREA methodology",
    description: "Newest data, sharpest insights,",
    description2: "greatest detail.",
    imageSection: (
      <>
        <Stack sx={imageBoxStackContainers}>
          <Box sx={barImgContainer}>
            <img
              src="/playground_assets/greenbar1.svg"
              alt="image5144"
              className="img-bar"
            />
          </Box>
          <Box sx={barImgContainer}>
            <img
              src="/playground_assets/greenbar2.svg"
              alt="image5144"
              className="img-bar"
            />
          </Box>
          <Box sx={barImgContainer}>
            <Stack sx={iconContainer} alignItems={"center"}>
              <img
                src="/playground_assets/star.svg"
                alt="image5144"
                className="img-bar"
              />
              <Typography sx={smallTextStyle}>TOP-rated by XREA</Typography>
            </Stack>
            <img
              src="/playground_assets/greenbar3.svg"
              alt="image5144"
              className="img-bar"
            />
          </Box>
        </Stack>
      </>
    ),
    bgStyle: xreaBgStyle,
    button: {
      buttonLable: "Learn More",
      handleClick: goToPricing
    },
  };
  return <SectionCard2 props={sectionCard2Props} />;
};
