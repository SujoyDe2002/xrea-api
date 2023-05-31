import { Box } from '@mui/material'
import React from 'react'

const ContentWrapper = ({ children }) => {
    return (
        <Box sx={{ width: { xs: "90%", md: "83.34%" }, mx: "auto" }}>
            {children}
        </Box>
    )
}

export default ContentWrapper