import React from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InventoryDialog from './InventoryDialog.js'
import InventoryTable from './InventoryTable.js'
import axios from 'axios'
import Cookies from 'js-cookie'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function InventoryMain(props) {

  const [posts, setPosts] = React.useState([])
  const { classes } = props;
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false); 
  const [messageAlert, setMessageAlert] = React.useState(""); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAlert = () => {
    setOpenAlert(true)
  }
      
  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const listItems = () => {axios.get('http://localhost:8000/api/item', {headers: {"Authorization":"Bearer " + Cookies.get("token")}})
  .then(response =>{
      setPosts(response.data)
  })
  .catch(error=>{
      console.log(error)
  })
}

  return (

    // Card on /inventory route 
    <Paper className={classes.paper}>

      {/* Header */}
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Typography color="textSecondary" >

                Inventory Manager
              </Typography>
            </Grid>

            <Grid item>
              <Fab size="small" color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
              </Fab>
              <InventoryDialog
                    open={open}
                    handleClose={handleClose}
                    listItems={listItems}
                    handleOpenAlert={handleOpenAlert}
                    setMessageAlert={setMessageAlert}
                    >
              </InventoryDialog>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Snackbar open={openAlert} autoHideDuration={10000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success">
          {messageAlert}
        </Alert>
      </Snackbar>

      {/* Body */}
      <div className={classes.contentWrapper}>
        <Typography color="textSecondary" align="center"></Typography>
        <InventoryTable 
        listItems={listItems}
        posts={posts}
        setPosts={setPosts}
        handleOpenAlert={handleOpenAlert}
        setMessageAlert={setMessageAlert}
        />
      </div>
    </Paper>
  );
}

InventoryMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InventoryMain);
