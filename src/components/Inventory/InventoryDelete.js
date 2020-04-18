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


function InventoryDelete({openDelete, handleClose, post_id, listItems, handleOpenAlert}) {

    const handleDelete = (post_id) => {
          handleOpenAlert("Your item has been deleted!")
          axios.delete("http://localhost:8000/api/item/" + post_id, {headers: {"Authorization":"Bearer " + Cookies.get("token")}})
          .then(response => {
              listItems()
              console.log(response)
          })
          .catch(error =>{
              console.log(error)
          })
    }

    return (
    <Dialog 
        open={openDelete} 
        onClose={handleClose} 
        overlayStyle={{backgroundColor: 'transparent'}}
        aria-labelledby="form-dialog-title"
        aria-describedby="alert-dialog-description" 
        maxWidth="sm" 
        fullWidth="true"
        >

    <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to delete?"}
    </DialogTitle>
    <Divider light />
    <DialogContent>
    <DialogContentText id="alert-dialog-description">
            This action will permanently delete this entry from your inventory. 
    </DialogContentText>
    </DialogContent>
    <DialogActions>
    <Button
          onClick={() => handleClose(false)}
          color="default">
            Cancel
    </Button>
    <Button
          onClick={() => {handleClose(false)
                          handleDelete(post_id)
                    }
                }
          color="primary">
            Confirm
    </Button>
    </DialogActions>
  </Dialog>
    )
}

export default InventoryDelete