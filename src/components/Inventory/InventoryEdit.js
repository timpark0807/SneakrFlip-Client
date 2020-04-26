import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InventoryForm from './InventoryForm.js'
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';


function InventoryEdit({openEdit, handleClose, post_id, listItems, handleOpenAlert}) {

    return (
    <Dialog 
        open={openEdit} 
        onClose={handleClose} 
        overlayStyle={{backgroundColor: 'transparent'}}
        aria-labelledby="form-dialog-title"
        aria-describedby="alert-dialog-description" 
        maxWidth="sm" 
        fullWidth="true"
        >

    <DialogTitle id="alert-dialog-title">
        <Grid container spacing={0}>
            <Grid item xs></Grid>
            <Grid item xs>
                {"Edit This Item"}
            </Grid>
            <Grid item xs>
                <DialogActions>
                    <Fab size="small" color="primary" aria-label="add" onClick={handleClose} style={{left:25, bottom:15}}>
                        <CloseIcon/>
                    </Fab>
                </DialogActions>
            </Grid>
        </Grid>
    </DialogTitle>

    <Divider light />
    <DialogContent>
      <Grid container justify="center">
        <InventoryForm
        action="edit"
        post_id={post_id}
        listItems={listItems}
        onClose={handleClose}
        handleOpenAlert={handleOpenAlert}
        />
    </Grid>
    </DialogContent>
  </Dialog>
    )
}

export default InventoryEdit