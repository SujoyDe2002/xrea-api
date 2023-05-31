import { Card } from '@mui/material'
import { card1style } from 'app'
import React from 'react'
// import './frame-homepagewiththesearchbarandthetotallistofclu.css'

export const SectionCard = ({ children }) => {
    return (
        // <div className="frame-homepagewiththesearchbarandthetotallistofclu-group63">
        <Card sx={card1style}>
            {children}
        </Card>
    )
}
