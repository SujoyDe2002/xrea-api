import { Box, Button, Stack } from '@mui/material'
import { button3, buttonContainer, confirmationBoxContainter, smallMessageBox } from 'app'
import React from 'react'

const ConfirmationBox = ({ content }) => {
    return (
        <Box sx={smallMessageBox}>
            Delete this saved search?
            <Stack sx={buttonContainer} >
                <Button>Cancel</Button>
                <Button sx={button3}>Delete</Button>
            </Stack>
        </Box>
    )
}

export default ConfirmationBox