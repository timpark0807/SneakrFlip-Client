import React from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import InventoryCreate from './InventoryCreate.js'
import InventoryTable from './InventoryTable.js'
import axios from 'axios'
import Cookies from 'js-cookie'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button'

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
    marginTop:'10px',
    margin: '40px 16px',
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function InventoryMain(props) {

  const [posts, setPosts] = React.useState([])
  const { classes } = props;
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false); 
  const [messageAlert, setMessageAlert] = React.useState(""); 

  const handleClickCreate = () => {
    setOpenCreate(true);
  };

  const handleClose = () => {
    setOpenCreate(false);
  };

  const handleOpenAlert = (message) => {
    setMessageAlert(message)
    setOpenAlert(true)
  }
      
  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const handleRefresh = () => {
    setPosts([])
    listItems()
  }

  const listItems = () => {axios.get('http://api.sneakrflip.com/api/item', {headers: {"Authorization":"Bearer " + Cookies.get("token")}})
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
                Inventory
              </Typography>
            </Grid>

            <Grid item>
            {posts &&
            <React.Fragment>
              <Tooltip title="Refresh">
                <IconButton variant='contained' size="small" color="default" aria-label="refresh" onClick={() => handleRefresh()}>
                    <RefreshIcon/>
                </IconButton>
              </Tooltip>

              <Tooltip title="Add New">
                <Button variant='contained' size="small" color="primary" 
                        aria-label="add" onClick={handleClickCreate} style={{marginLeft:10}}>
                  Create Item
                </Button>
              </Tooltip>
            </React.Fragment>
            }

            {!posts &&
              <Tooltip title="Create First Entry!">
              <Badge 
                color="secondary" 
                badgeContent="!" 
             //   overlap="circle" 
              >
                <Button variant='contained' size="small" color="primary" 
                        aria-label="add" onClick={handleClickCreate} style={{marginLeft:10}}>
                  Create Item
                </Button>
              </Badge>
              </Tooltip>
            }

              <InventoryCreate
                    openCreate={openCreate}
                    handleClose={handleClose}
                    listItems={listItems}
                    handleOpenAlert={handleOpenAlert}
                    >
              </InventoryCreate>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
 
      <Snackbar 
      open={openAlert} 
      autoHideDuration={10000} 
      onClose={handleCloseAlert}      
      >
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
        />
      </div>
    </Paper>
  );
}

InventoryMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InventoryMain);
