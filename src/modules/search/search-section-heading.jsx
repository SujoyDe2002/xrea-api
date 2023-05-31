import { Stack } from '@mui/material'
import React from 'react'

export const SearchSectionHeading = ({ children }) => {
    return(
        <Stack flexDirection={"row"} justifyContent={"space-between"} width={"100%"} mb={"5.5VW"}>
            {children}
        </Stack>
    )
}
