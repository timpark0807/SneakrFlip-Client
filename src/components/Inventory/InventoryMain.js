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


function InventoryMain(props) {

  const { classes } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                    handleClose={handleClose}>
              </InventoryDialog>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* Body */}
      <div className={classes.contentWrapper}>
        <Typography color="textSecondary" align="center"></Typography>
        <InventoryTable />
      </div>
    </Paper>
  );
}

InventoryMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InventoryMain);
