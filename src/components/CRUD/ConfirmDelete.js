import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Cookies from 'js-cookie'
import Divider from '@material-ui/core/Divider';


function ConfirmDelete({open, handleClose, post_id}) {

    const handleDelete= (post_id) => {
          axios.delete("http://localhost:8000/api/property/" + post_id, {headers: {"Authorization":"Bearer " + Cookies.get("token")}})
          .then(response => {
              console.log(response)
          })
          .catch(error =>{
              console.log(error)
          })
    }

    return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" align="center" maxWidth="sm" fullWidth="true">
    <DialogTitle id="alert-dialog-title">
                  Are you sure you want to delete?
    </DialogTitle>
    <Divider light />

    <DialogActions>
    <Button
          variant="contained"
          onClick={() => handleClose(false)}
          color="default">
            No
    </Button>
    <Button
          variant="contained"
          onClick={() => {handleClose(false)
                        handleDelete(post_id)
                    }
                }
          color="primary">
            Yes
    </Button>


    </DialogActions>
  </Dialog>
    )
}

export default ConfirmDelete