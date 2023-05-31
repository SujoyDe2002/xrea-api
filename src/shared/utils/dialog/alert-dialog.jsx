import { React, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { dialog, dialogActionStyle, dialogTitle } from 'app';
import { Box, Grid } from '@mui/material';
import Button2 from '../button/button2';

export default function AlertDialog({ props }) {

  const { title, dialogContent, dialogAction, actionsOnUnMount } = props;
  const { button1, button2 } = dialogAction;

  useEffect(() => {
     
    return () => {
      actionsOnUnMount()
    }
  }, [])
  
  return (
    <div>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={dialog}
      >
        <DialogTitle id="alert-dialog-title" sx={dialogTitle}>
          {title}
        </DialogTitle>
        <DialogContent sx={{ py: 0 }}>
          {dialogContent}
        </DialogContent>
        <Grid container spacing={1} my={2}>
          <Grid item xs={9}></Grid>
          <Grid item xs={3}>
            <DialogActions sx={dialogActionStyle}>
              <Box mr={2}>
                {button1}
              </Box>
              <Box>
                {button2}
              </Box>
            </DialogActions>

          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}