import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Cookies from 'js-cookie'
import Divider from '@material-ui/core/Divider';
import InventoryForm from './InventoryForm.js'
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

function InventoryDialog({open, handleClose}) {

    return (
        
    <Dialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        aria-describedby="alert-dialog-description" 
        maxWidth="sm" 
        fullWidth="true"
    >
    {/* Header */}
    <DialogTitle id="alert-dialog-title">
        <Grid container spacing={0}>
            <Grid item xs></Grid>
            <Grid item xs>
                {"Add More Inventory"}
            </Grid>
            <Grid item xs>
                <DialogActions>
                    <Fab size="small" color="primary" aria-label="add" onClick={handleClose} style={{left:25, bottom:5}}>
                        <CloseIcon/>
                    </Fab>
                </DialogActions>
            </Grid>
        </Grid>
    </DialogTitle>

    <Divider light />

    {/* Body */}
    <DialogContent>
    <InventoryForm></InventoryForm>
    </DialogContent>
    
  </Dialog>
    )
}

export default InventoryDialog