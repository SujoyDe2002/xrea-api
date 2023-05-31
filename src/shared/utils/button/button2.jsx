import { Button } from '@mui/material'
import { button2 } from 'app'
import React from 'react'

const Button2 = ({props}) => {
    const { title, handleClick } = props;

    return (
        <Button sx={button2} onClick={handleClick}>{title}</Button>
    )
}

export default Button2