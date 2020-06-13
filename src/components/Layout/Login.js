
import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import Cookies from 'js-cookie'
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login';
import GitHubLogin from 'react-github-login';
import './Layout.css'
import { useHistory } from 'react-router-dom';

function LoginDialog({openLogin, handleLoginClose}) {
    const history = useHistory() 

    const responseGoogle = response => {
        Cookies.set("token", response.wc.access_token, {sameSite: 'lax' })
        Cookies.set("userDetails", response.profileObj.imageUrl)
        handleLoginClose()
        history.push("/inventory")
      };

    const responseFacebook = response => {
        console.log(response)
        // Cookies.set("token", response.access_token, {sameSite: 'lax' })
        handleLoginClose()
    }

    return (
        <Dialog
        open={openLogin}
        onClose={handleLoginClose} 
        maxWidth={"xs"}
        >

        <DialogContent>
            <Grid container spacing={1}>

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
                            Sneakr Flip
                    </Typography>
                </Grid>

                <Grid item xs={12} style={{paddingBottom:"10px"}}>
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
                        className="btnGoogle"
                        >
                    </GoogleLogin>
                </Grid> 

                <Grid item xs={12} align="center">
                    <FacebookLogin
                    appId="673974656510450"
                    icon="fa-facebook"
                    fields="name,email,picture"
                    cssClass="btnFacebook"
                    textButton="Sign in with Facebook"
                    render={renderProps => (
                        <button className="btnFacebook" onClick={renderProps.onClick}>This is my custom FB button</button>
                       )}
                    callback={responseFacebook}
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