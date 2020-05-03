import React, {Component} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import {NavLink } from "react-router-dom"
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize:14,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});


class Navigator extends Component {
  render () {
    
  const { classes, ...other } = this.props;

  return (
     <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          SneakrFlip
        </ListItem>

          <React.Fragment>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                Management
              </ListItemText>
            </ListItem>
            
            <ListItem button className={classes.item} component={NavLink} activeClassName={classes.itemActiveItem} to='/home'>
              <ListItemIcon className={classes.itemIcon}><HomeIcon /></ListItemIcon>
              <ListItemText classes={{primary: classes.itemPrimary,}}>
                Home
              </ListItemText>
            </ListItem>

            <ListItem button className={classes.item} component={NavLink} activeClassName={classes.itemActiveItem} to='/inventory'>
              <ListItemIcon className={classes.itemIcon}><StoreIcon /></ListItemIcon>
              <ListItemText classes={{primary: classes.itemPrimary,}}>
                Inventory
              </ListItemText>
            </ListItem>

            <ListItem button className={classes.item} component={NavLink} activeClassName={classes.itemActiveItem} to='/about'>
              <ListItemIcon className={classes.itemIcon}><HelpOutlineIcon /></ListItemIcon>
              <ListItemText classes={{primary: classes.itemPrimary,}}>
                About
              </ListItemText>
            </ListItem>

            <Divider className={classes.divider} />
          </React.Fragment>

      </List>
    </Drawer>
  );
}}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
