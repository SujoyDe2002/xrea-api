import * as React from "react";
import {
  blankTableCell,
  itemTableDataCellStyle,
  tableCell,
  tableHeader,
  tableRow,
} from "app";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import TooltipHelp from "shared/utils/tooltip/tooltip-help";

export const GeneralStat = ({ rows }) => {
  const { data, label } = rows;
  return (
    <Box>
      <Stack sx={tableRow}>
        <Box sx={tableHeader}>
          {"10 year population growth"}
          <Stack alignItems={"center"} ml={1}>
            <TooltipHelp
              title={
                "The United States 10-year Population Growth Rate from 2011-2021 was 7.54%"
              }
            />
          </Stack>
        </Box>
        {data.map((row, index) => {
          return (
            <Box key={index} sx={tableCell}>
              <Typography sx={itemTableDataCellStyle}>
                {row.tenYearPopGrowthRate}
              </Typography>
            </Box>
          );
        })}
      </Stack>
      <Stack sx={tableRow}>
        <Box sx={tableHeader}>
          {"Home Price to Income Ratio"}
          <Stack alignItems={"center"} ml={1}>
            <TooltipHelp
              title={
                "The United States Home Price to Income Ratio for 2021 is Roughly 3.54"
              }
            />
          </Stack>
        </Box>
        {data.map((row, index) => {
          return (
            <Box key={index} sx={tableCell}>
              <Typography sx={itemTableDataCellStyle}>
                {row.homePToIncome}
              </Typography>
            </Box>
          );
        })}
      </Stack>
      <Stack sx={tableRow}>
        <Box sx={tableHeader}>
          {"Median Income"}
          <Stack alignItems={"center"} ml={1}>
            <TooltipHelp
              title={`The United States Median Household Income (in 2021 inflation-adjusted dollars)  is 69,717`}
            />
          </Stack>
        </Box>
        {data.map((row, index) => {
          return (
            <Box key={index} sx={tableCell}>
              <Typography sx={itemTableDataCellStyle}>
                {row.medianIncome}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
