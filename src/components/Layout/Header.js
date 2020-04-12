import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login'
import { GoogleLogout } from "react-google-login";
import Cookies from 'js-cookie'

class Header extends Component {
        constructor() {
          super();
          
          this.state = {
            userDetails: {},
            isUserLoggedIn: false,
          };
        }


  responseGoogle = response => {
    console.log(response)
    console.log(response.tc.access_token)
    Cookies.set("token", response.tc.access_token)
    Cookies.set("userDetails", response.profileObj.imageUrl)
    this.setState({ userDetails: response.profileObj, isUserLoggedIn: true, accessToken: response.profileObj.email });
  };

  logout = () => {
    Cookies.remove("token")
    Cookies.remove("imageUrl")
    this.setState({isUserLoggedIn: false})
  };

  render() {

  return (
    <React.Fragment>
 
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Authentication
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
          {!this.state.isUserLoggedIn && (
            <GoogleLogin
              clientId="ENTERHERE" 
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
          )}

          {this.state.isUserLoggedIn && (
              <GoogleLogout
              render={renderProps => (
                <IconButton color="inherit"
                className="logout-button"
                  onClick={renderProps.onClick}>
                  <Avatar src={Cookies.get("userDetails")}></Avatar>
                  </IconButton>
                
                )}
              onLogoutSuccess={this.logout}
              />

          )}

              </Grid>
          </Toolbar>
        </AppBar>

      </React.Fragment>
    );
  }
}

export default Header;
