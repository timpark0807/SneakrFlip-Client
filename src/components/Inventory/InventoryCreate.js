import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import InventoryForm from './InventoryForm.js'
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

function InventoryCreate({openCreate, handleClose, listItems, handleOpenAlert}) {

    return (
        
    <Dialog 
        open={openCreate} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        aria-describedby="alert-dialog-description" 
        maxWidth="xs" 
    >
    {/* Header */}
    <DialogTitle id="alert-dialog-title">
        <Grid container align="center">
            <Grid item xs>
                {"Add More Inventory"}
            </Grid>
        </Grid>
    </DialogTitle>

    <Divider light />

    {/* Body */}
    <DialogContent>
        <Grid container justify="center">
            <InventoryForm
            action="create"
            listItems={listItems}
            onClose={handleClose}
            handleOpenAlert={handleOpenAlert}
            />
        </Grid>
    </DialogContent>
  </Dialog>
    )
}

export default InventoryCreate