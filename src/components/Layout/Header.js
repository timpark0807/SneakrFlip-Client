import React, { useState, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { GoogleLogout } from "react-google-login";
import Cookies from 'js-cookie'
import {  NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import LoginDialog from './../Layout/Login'

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
                <Button onClick={handleLoginOpen}>
                Login
                </Button>

               
          )}

          <LoginDialog
            openLogin={openLogin}
            handleLoginClose={handleLoginClose}
          />

          {Cookies.get("token") && (
              <GoogleLogout
              clientId="156573644182-2u91vb6240l0ld426efbeccbibjdigat.apps.googleusercontent.com" 
              render={renderProps => (
                <IconButton color="inherit"
                className="logout-button"
                  onClick={renderProps.onClick}>
                  <Avatar src={Cookies.get("userDetails")}></Avatar>
                  </IconButton>
                
                )}
              onLogoutSuccess={logout}
              />
          )}

              </Grid>
          </Toolbar>
        </AppBar>

      </Fragment>
    );
  
}

export default Header;
