import { Box, Stack } from '@mui/material'
import { backgroundOverLay, loaderContainer } from 'app'
import React from 'react'

const OverlayLayout = ({ children }) => {
    return (
        <Box sx={backgroundOverLay}>
            <Box sx={loaderContainer}>
                <Stack alignItems={"center"}>
                    {children}
                </Stack>
            </Box>
        </Box>
    )
}

export default OverlayLayout