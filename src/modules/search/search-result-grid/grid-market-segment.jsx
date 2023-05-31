import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  tableCell,
  tableHeader,
  tableRow,
  boxStyle,
  marketSegmentHeading,
} from "app";

export const MarketSegmentRow = ({ marketSegmentProps }) => {
  // const { marketSegmentData, rowLength, getCityIndex } = marketSegmentProps;
  // const { data } = marketSegmentData;

  //console.log("rowLengthff", rowLength);
  return (
    <Stack sx={tableRow}>
      {/* <Box sx={tableHeader}>{"Market Segment"}</Box> */}
      {data.map((row, index) => {
        return (
          <Box key={index} sx={tableCell}>
            <Box>
              {/* <Box sx={boxStyle} indexid={index} onClick={getCityIndex}></Box> */}
              <Box sx={boxStyle} indexid={index} ></Box>
              <Typography sx={marketSegmentHeading}>
                {"Market"}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
};
