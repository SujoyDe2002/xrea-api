import { TableRow } from '@mui/material'
import React from 'react'

export  const SegmentGeneneralStatTableRow = ({ rowData }) => {
    return (
        <>
            {rowData?.map((index) => {

                return(
                    <TableRow key={index} >
                        
                    </TableRow>
                )
            })}
            
        </>
    )
}

