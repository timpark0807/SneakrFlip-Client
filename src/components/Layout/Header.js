import React, { useState, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { GoogleLogout } from "react-google-login";
import Cookies from 'js-cookie'
import Button from '@material-ui/core/Button';
import LoginDialog from './../Layout/Login'
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';

function Header() {

  const [openLogin, setOpenLogin] = React.useState(false)

  const logout = () => {
    console.log("logout")
    Cookies.remove("token")
    Cookies.remove("userDetails")
    this.setState({isUserLoggedIn: false})
  };

  const handleLoginOpen = () => {
      setOpenLogin(true)
  }

  const handleLoginClose = () => {
    setOpenLogin(false)
  }


  const [openLogout, setOpenLogout] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleMenuItemClick = (event) => {
    setOpenLogout(false);
  };

  const handleToggle = () => {
    setOpenLogout((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenLogout(false);
  };

  return (
    <Fragment>
 
      <AppBar component="div" color="primary" position="static" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
          {!Cookies.get("token") && (
                <Button onClick={handleLoginOpen} color="white">
                Login
                </Button>

               
          )}

          <LoginDialog
            openLogin={openLogin}
            handleLoginClose={handleLoginClose}
          />

          {Cookies.get("token") && (
            <React.Fragment>
              <IconButton color="inherit"
                className="logout-button"
                  onClick={handleToggle}
                  ref={anchorRef}>
                  <Avatar src={Cookies.get("userDetails")}></Avatar>
              </IconButton>

              <Popper open={openLogout} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="split-button-menu">
                          <MenuItem
                            onClick={(event) => handleMenuItemClick(event)}
                          >
                              Logout
                          </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                  </Grow>
                )}
              </Popper>
            </React.Fragment>
            )}

              {/* <GoogleLogout
              clientId="156573644182-2u91vb6240l0ld426efbeccbibjdigat.apps.googleusercontent.com" 
              render={renderProps => (
                <IconButton color="inherit"
                className="logout-button"
                  onClick={renderProps.onClick}>
                  <Avatar src={Cookies.get("userDetails")}></Avatar>
                  </IconButton>
                )}
              onLogoutSuccess={logout}
              /> */}
              </Grid>
          </Toolbar>
        </AppBar>

      </Fragment>
    );
  
}

export default Header;
