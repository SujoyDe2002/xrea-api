import * as React from 'react';
import Box from '@mui/material/Box';
import {loaderStyle, overLayText } from 'app';
import { Typography } from '@mui/material';
import OverlayLayout from '../layout/overlay-layout';

export default function CircularIndeterminate() {
  return (
    <OverlayLayout>
      <Box sx={loaderStyle}></Box>
      <Typography sx={overLayText}>Processing...</Typography>
    </OverlayLayout>

  );
}