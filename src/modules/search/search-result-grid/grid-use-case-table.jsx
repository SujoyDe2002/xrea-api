import * as React from "react";
import {
  AppStyle,
  blankTableCell,
  centerAbsoluteItem,
  itemTableDataCellStyle,
  itemTableDataCellStyleBold,
  maxIndexValue,
  tableCell,
  tableCellValue,
  tableHeader,
  tableRow,
} from "app";
import { Box, Stack, Typography } from "@mui/material";

export const UseCaseTable = ({ rows }) => {
  const { data, label } = rows;
  //console.log("label", label);

  return (
    <Box>
      {label.map((labelName, index) => {
        let { use_case_group_desc, use_case_group, use_case_color } = labelName;
        return (
          <Stack key={index} sx={tableRow}>
            <Box key={index} sx={tableHeader}>{use_case_group_desc}</Box>
            {data.map((row, index) => {
              tableCellValue.color = use_case_color;
              const maxValuStyle = {
                ...itemTableDataCellStyleBold,
                ...tableCellValue,
              };
              const othesValueStyle = {
                ...itemTableDataCellStyle,
                ...tableCellValue,
              };
              let valueStyle;
              let bgcolor = AppStyle.palette.common.white;
              if (use_case_group === row.max) {
                valueStyle = maxValuStyle;
                bgcolor = use_case_color;
              } else {
                valueStyle = othesValueStyle;
              }
              return (
                <Box key={index} sx={tableCell}>
                  <>
                    <Box sx={{ ...maxIndexValue, bgcolor }}></Box>
                    <Typography sx={valueStyle}>
                      {row[use_case_group]}
                    </Typography>
                  </>
                </Box>
              );
            })}
          </Stack>
        );
      })}
    </Box>
  );
};
