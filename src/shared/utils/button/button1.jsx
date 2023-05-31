import { Box, Button, Typography } from '@mui/material'
import { button1 } from 'app';
import React from 'react'

const Button1 = ({props}) => {
  const {handleClick, style, disabled, title} = props;
  return (
    <Button sx={{ ...button1, ...style }} onClick={handleClick} disabled={disabled}>
      <Typography variant='h2' fontSize={"1.125rem"}>{title}</Typography>
      <Box sx={{ width: "20px", ml: 1 }}>
        <img className='image' src='/playground_assets/logo_icon.png' />
      </Box>
    </Button>
  )
}

export default Button1