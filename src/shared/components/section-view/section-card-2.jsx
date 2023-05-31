import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import {
  buttonStyle,
  heading1,
  card2BuronContainer,
  card2style,
  infoDes,
} from "app";

export const SectionCard2 = ({ props }) => {
  const { title, description, description2, imageSection, bgStyle, button } =
    props;
  const { buttonLable, handleClick } = button;
  console.log("desc", description);
  return (
    <Box sx={card2style}>
      <Box sx={bgStyle}></Box>
      <Grid container spacing={"1.2rem"}>
        <Grid item xs={12} md={9}>
          <div>
            <div className="frame-homepagewiththesearchbarandthetotallistofclu-text14">
              <Typography sx={heading1}>{title}</Typography>
              <Typography sx={infoDes}>{description}</Typography>
              <Typography sx={infoDes}>{description2}</Typography>
            </div>
            {/* <Typography sx={description1}>{description}</Typography> */}
          </div>
          <Stack
            sx={{ ...card2BuronContainer, display: { xs: "none", md: "flex" } }}
          >
            <Button sx={buttonStyle} variant="contained" onClick={handleClick}>
              {buttonLable}
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={3}>
          {imageSection}
          <Stack
            sx={{ ...card2BuronContainer, display: { xs: "flex", md: "none" } }}
          >
            <Button
              sx={{ ...buttonStyle, width: "fit-content" }}
              variant="contained"
              onClick={handleClick}
            >
              {" "}
              {buttonLable}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
