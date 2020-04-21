
import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie'
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login';
import GitHubLogin from 'react-github-login';

import './Layout.css'

function LoginDialog({openLogin, handleLoginClose}) {

    const responseGoogle = response => {
        Cookies.set("token", response.tc.access_token, {sameSite: 'lax' })
        Cookies.set("userDetails", response.profileObj.imageUrl)
      };

    return (
        <Dialog
        open={openLogin}
        onClose={handleLoginClose} 
        fullWidth={true}
        maxWidth = {'sm'}
        >
        <DialogContent>

            <Typography 
                variant="h6"
                align="right">
                    x
            </Typography>

            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Typography 
                        variant="h6"
                        align="center">
                            Sign in to
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography 
                        variant="h5"
                        align="center">
                            Resell Manager
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography 
                        variant="subtitle1"
                        align="center">
                            Login to access your inventory.
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} align="center">
                    <GoogleLogin
                        clientId="156573644182-2u91vb6240l0ld426efbeccbibjdigat.apps.googleusercontent.com" 
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        className="btnGoogle">
                    </GoogleLogin>
                </Grid> 

                <Grid item xs={12} align="center">
                    <FacebookLogin
                    icon="fa-facebook"
                    cssClass="btnFacebook"
                    />  
                </Grid> 
                <Grid item xs={12} align="center">
                    <GitHubLogin
                    className="btnGitHub"
                    />  
                </Grid> 
            </Grid>

        </DialogContent>

        </Dialog>
    )


}

export default LoginDialog 