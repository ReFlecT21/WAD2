import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import React, { useEffect, useState } from 'react';



export default function PageNotification({message, render}) {
  const [open, setOpen] = useState(render);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000} // Adjust the duration as needed
      onClose={handleClose}
    >
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success" onClose={handleClose}>
          <AlertTitle>Success</AlertTitle>
          {message}
        </Alert>
      </Stack>
    </Snackbar>
  );
}