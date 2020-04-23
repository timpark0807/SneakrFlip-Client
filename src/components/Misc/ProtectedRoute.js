import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
          props => {
            if (Cookies.get("token")) {
              return <Component {...rest} {...props} />
            } else {
              return <Redirect to={
                {
                  pathname: '/home'
                }
              } />
            }
          }
        } />
      )
    }
    

export default ProtectedRoute;
