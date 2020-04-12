import React, { Component, Fragment } from 'react';
import Header from './Layout/Header.js'
import Navigator from './Layout/Navigator.js'
import { Route, NavLink, HashRouter} from "react-router-dom";
import Content from './CRUD/Create';
import Read from './CRUD/Read';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
let theme = createMuiTheme({
    palette: {
      primary: {
        light: '#63ccff',
        main: '#009be5',
        dark: '#006db3',
      },
    },
    typography: {
      h5: {
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: 0.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    props: {
      MuiTab: {
        disableRipple: true,
      },
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
  });
  
  theme = {
    ...theme,
    overrides: {
      MuiDrawer: {
        paper: {
          backgroundColor: '#18202c',
        },
      },
      MuiButton: {
        label: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
      MuiTabs: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
      MuiTab: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
      MuiIconButton: {
        root: {
          padding: theme.spacing(1),
        },
      },
      MuiTooltip: {
        tooltip: {
          borderRadius: 4,
        },
      },
      MuiDivider: {
        root: {
          backgroundColor: '#404854',
        },
      },
      MuiListItemText: {
        primary: {
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
      MuiListItemIcon: {
        root: {
          color: 'inherit',
          marginRight: 0,
          '& svg': {
            fontSize: 20,
          },
        },
      },
      MuiAvatar: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  };
  
  const drawerWidth = 256;
  
class App extends Component {
    constructor(props) {
        super(props);
        this.classes = props;
    }

    render() {
        return (
        <ThemeProvider theme={theme}>
        <div style={{display: 'flex',
                     minHeight: '100vh',
                     marginLeft: theme.spacing(32) }}>
        <CssBaseline />

        <HashRouter>
        <Fragment>
            <div style={{flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        }}>
            <Header/>
            <Navigator PaperProps={{ style: { width: drawerWidth } }}/>
            <main style={{flex: 1,
                          padding: theme.spacing(6, 4),
                            background: '#eaeff1',
                        }}>
            <Route exact path="/create" component={Content}/>
            <Route path="/read" component={Read}/>
          </main>
        </div>
        </Fragment>
        </HashRouter>
        </div>
        </ThemeProvider>
        )
    }
}


  
export default App