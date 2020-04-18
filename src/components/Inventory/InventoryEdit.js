import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Cookies from 'js-cookie'
import Divider from '@material-ui/core/Divider';
import InventoryForm from './InventoryForm.js'


function InventoryEdit({openEdit, handleClose, post_id, listItems, handleOpenAlert}) {

    const handleEdit = (post_id) => {
          handleOpenAlert("Your item has been edited!")
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
        open={openEdit} 
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
    
    <InventoryForm
    action="edit"
    post_id={post_id}
    listItems={listItems}
    onClose={handleClose}
    handleOpenAlert={handleOpenAlert}
    />

    </DialogContent>
    <DialogActions>
    <Button
          onClick={() => handleClose(false)}
          color="default">
            Cancel
    </Button>
    <Button
          onClick={() => {handleClose(false)
                         handleEdit(post_id)
                    }
                }
          color="primary">
            Confirm
    </Button>
    </DialogActions>
  </Dialog>
    )
}

export default InventoryEdit