import { Box } from '@mui/material'
import { card3Style } from 'app'
import React from 'react'

 
export const SectionSearchCard = ({ children }) => {
    return (
        <Box sx={card3Style}>
            {children}
        </Box>
    )
}

