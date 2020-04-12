import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import PropertyForm from './PropertyForm.js'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

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


function Content(props) {

  const { classes } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
     
            <Grid item xs>
              <Typography color="textSecondary" >
                Property Manager
              </Typography>
            </Grid>
            <Grid item>

              <Fab size="small" color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
              </Fab>

              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" align="center" maxWidth="sm" fullWidth="true">
                <DialogTitle id="alert-dialog-title">
                  <Grid container spacing={0}>
                    <Grid item xs>
                      
                    </Grid>
                    <Grid item xs>
                        {"Add New Property"}
                    </Grid>
                    <Grid item xs>
                    <DialogActions>
                      <Fab size="small" color="primary" aria-label="add" onClick={handleClose} style={{left:25, bottom:20}}>
                          <CloseIcon/>
                      </Fab>
                    </DialogActions>
                    </Grid>
                  </Grid>
                </DialogTitle>
                <DialogContent style={{"margin-bottom":30}}>
                  <PropertyForm/>
                </DialogContent>
              </Dialog>

            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        <Typography color="textSecondary" align="center">
        </Typography>
      </div>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
