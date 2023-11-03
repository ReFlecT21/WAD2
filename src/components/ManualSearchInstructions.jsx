import React, { useEffect, useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Button } from 'react-bootstrap';

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
        <Button className="buttonPrimary" onClick={handleClick} style={{width:"100px"}}>Instructions</Button>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            
            
        >
            <Typography sx={{ p: 2 }}>
                Select the food items you are eating and key in the quantity in the next step <br/>
                You may search to add your dishes or manually key in the information
            </Typography>
        </Popover>
    </div>
  );
}