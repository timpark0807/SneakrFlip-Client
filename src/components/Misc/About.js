import React from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

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

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
function About(props) {
    const { classes } = props;
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
        <Paper className={classes.paper}>
            <AppBar position="static" color="default">
                <Tabs value={value} onChange={handleChange} aria-label="tabs" TabIndicatorProps={{style: {background:'black'}}}>
                    <Tab label="About the Application" {...a11yProps(0)} />
                    <Tab label="The Tech Stack" {...a11yProps(1)} />
                    <Tab label="Getting Started" {...a11yProps(2)} />
                    <Tab label="How It Works" {...a11yProps(3)} />
                    <Tab label="Contact" {...a11yProps(4)} />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
                  <b>Welcome! </b> 
                  <br/>
                      My name is Tim Park and I developed SneakrFlip as a personal project to showcase my software engineering skill set.
                  <br/><br/>
                      One of my hobbies as a teenager was reselling sneakers and other limited edition items. 
                      One problem I frequently encountered was how to consistently track my inventory. 
                      I would use a combination of iPhone notes, Excel workbooks, and my memory - which never worked too well. 
                  <br/><br/>
                      Once I discovered my passion for software development, I knew I wanted to make apps relating to my existing hobbies. 
                      So it was a no brainer to draw from my previous expereince as a sneaker reseller and create a centralized inventory management application. 
                  <br/><br/>
                      Click the header tabs to learn more about SneakrFlip!

            </TabPanel>

            <TabPanel value={value} index={1}>
                <b>Backend</b>
                <br/>
                The SneakrFlip backend is written in GoLang.
                This features a RESTful API service that allows users to create, read, update, and delete records via HTTP requests. 
                The backend is integrated with oAuth to handle authentication and verify requests are authorized. 
                Data is stored in MongoDB.
                <br/><br/>
                <b>Frontend</b>
                <br/>
                The SneakrFlip frontend is a single page application written in React.js. 
                The Material UI library was used to help style the components.  
                Our front end application provides an interface for users to consume the backend API endpoints. 
                <br/><br/>
                <b>Deployment</b>
                <br/>
                SneakrFlip was deployed to Amazon Web Services. 
                Our frontend sits in an S3 bucket that serves static HTML/CSS/JS content to the user’s browser. 
                Our backend API was deployed to a group of Auto Scaling EC2 instances. 
                A load balancer sits in between the frontend/backend to distribute requests evenly between instances. 
                <br/><br/>
                <img src={require('./Gifs/Diagram.png')} alt="loading..." width="890" height="500" styles={{textAlign:"center"}}/>
                <br/><br/>
                <b>CI/CD</b>
                <br/>
                In order to streamline the development/deployment process, I built an automated CI/CD pipeline using AWS CodePipeline. 
                <br/><br/>
                A GitHub commit will trigger a build process via AWS Code Build. 
                Once the build is completed, Code Deploy will output the build files to the AWS S3 bucket. 
                Every git push to the master branch will automatically deploy to the live SneakrFlip.com website. 
                <br/>

            </TabPanel>

            <TabPanel value={value} index={2}>
                <b>Logging in</b>
                <br/>
                    The user must be logged in to use the application. 
                    I made a decision to not store usernames and passwords due to security risks.
                    Instead, I integrated social logins via oAuth to provide a secure, familiar, and reliable way for users to access my application.
                    Currently only the Google login is supported. 
                <br/>
                <br/>

                <img src={require('./Gifs/Login.gif')} alt="loading..." width="890" height="500" styles={{textAlign:"center"}}/>
                <br/>
            </TabPanel>

            <TabPanel value={value} index={3}>
                <b>CRUD Functionality</b>
                <br/>
                After successfully logging in, the user is able to access the inventory console. 
                The console allows the user to perform create, read, update, and delete operations to manage their inventory. 
                <br/>
                <br/>
                Clicking buttons will programmatically send requests to the backend API. 
                For example, submitting the popup from the “Create Item” button will send a PUT request with the item details 
                and clicking the trash icon will send a DELETE request for the item. 
                <br/>
                <br/>
                <img src={require('./Gifs/Functionality.gif')} alt="loading..." width="890" height="500" styles={{textAlign:"center"}}/>
                <br/>
                <br/>
                <b>Authentication</b>
                <br/>
                Each request will contain the JWT token obtained from a successful oAuth login. 
                This token will contain information about the current user. 
                The backend will check that the current user matches the user who created the inventory item in the database. 
                If the users do not match, we deny access to that operation. As a result, a User A cannot delete an item created by another User B. 
                <br/>
                <br/>
            </TabPanel>

            <TabPanel value={value} index={4}>
              <b>Getting in Touch</b>
              <br/>
                You can reach out to me at timpark0807@gmail.com.
              <br/>
            </TabPanel>

        </Paper>
    );
  }
  
About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
