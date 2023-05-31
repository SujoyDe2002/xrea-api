import * as React from 'react';
import Box from '@mui/material/Box';
import { loaderStyle, overLayText } from 'app';
import { Typography } from '@mui/material';
import OverlayLayout from '../layout/overlay-layout';

export default function ResponseMessage({message}) {
    return (
        <OverlayLayout>
            <img
                src="/playground_assets/success.svg"
                alt="image5144"
                className="overlay-image"
            />
            <Typography sx={overLayText}>{message}</Typography>
        </OverlayLayout>

    );
}