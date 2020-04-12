import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import {NavLink } from "react-router-dom"

const categories = [
  {
    id: 'Develop',
    children: [
      { id: 'People', icon: <PeopleIcon />, linkTo:'/create'},
      { id: 'Property', icon: <DnsRoundedIcon />, linkTo:'/read', active:'yes'},
      { id: 'Update', icon: <PermMediaOutlinedIcon />, linkTo:'/update' },
      { id: 'Delete', icon: <PermMediaOutlinedIcon />, linkTo:'/delete' }
    ],
  },
];


const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
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


function Navigator(props) {
  const { classes, ...other } = props;

  function handleClick(childId) {
    console.log(categories.children)
  }

  return (
     <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          Property Manager
        </ListItem>

          <React.Fragment>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                Develop
              </ListItemText>
            </ListItem>

            <ListItem button className={classes.itemActiveItem} component = {NavLink} to='/create' onClick={handleClick()}>
              <ListItemIcon className={classes.itemIcon}><PeopleIcon /></ListItemIcon>
              <ListItemText classes={{primary: classes.itemPrimary,}}>
                People
              </ListItemText>
            </ListItem>
            
            <ListItem button className={classes.item} component = {NavLink} to='/read' onClick={handleClick()}>
              <ListItemIcon className={classes.itemIcon}><DnsRoundedIcon /></ListItemIcon>
              <ListItemText classes={{primary: classes.itemPrimary,}}>
                Property
              </ListItemText>
            </ListItem>

            <Divider className={classes.divider} />
          </React.Fragment>

      </List>
    </Drawer>
    // <Drawer variant="permanent" {...other}>
    //   <List disablePadding>
    //     <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
    //       Property Manager
    //     </ListItem>

    //     {categories.map(({ id, children }) => (
    //       <React.Fragment key={id}>
    //         <ListItem className={classes.categoryHeader}>
    //           <ListItemText
    //             classes={{
    //               primary: classes.categoryHeaderPrimary,
    //             }}
    //           >
    //             {id}
    //           </ListItemText>
    //         </ListItem>
    //         {children.map(({ id: childId, icon, linkTo, active}) => (
    //           <ListItem
    //             key={childId}
    //             button
    //             className={clsx(classes.item, active && classes.itemActiveItem)}
    //             component = {NavLink} to={linkTo}
    //             onClick={handleClick()}
    //             >
    //             <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
    //             <ListItemText
    //               classes={{
    //                 primary: classes.itemPrimary,
    //               }}
    //             >
    //               {childId}
    //             </ListItemText>
    //           </ListItem>
    //         ))}

    //         <Divider className={classes.divider} />
    //       </React.Fragment>
    //     ))}
    //   </List>
    // </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
