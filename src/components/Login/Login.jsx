import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";

//Firebase conf file.
import app from "../../config/firebaseConfig"

//Authentication object 
import { AuthContext } from "../auth";

//Lottie Library
import Lottie from 'react-lottie'

//Local Animation
import animationData from '../../anim/planet.json'

//Material UI library
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import AvatarRamon from './ram.png';
import AvatarGonzalo from './gonzalo.png';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: "flex",
    justifyContent: "center",
    border: 20,
    borderStyle: 'solid',
    borderColor: 'white',
  },
  image: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  rightDiv: {
    alignItems: 'center',
    margin: theme.spacing(11, 0, 2),
  },
  title: {
    color: 'white',
    textShadow: '6px 6px black',
  },
  credits: {
    color: 'white',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  leftDiv: {
    paddingLeft: '25px',
    borderRadius: '10px'
  },
}));

//Object for styling the component
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};



const Login = ({ history }) => {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      console.log(email)
      console.log(password)
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  // Create a new theme using Nunito Sans
  const theme = createMuiTheme({
    typography: {
      fontFamily: "Montserrat, Roboto, sans-serif"
    }
  });

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={8} md={6} style={{ backgroundColor: "#6200ea" }} className={classes.leftDiv}>
        <Typography align="left" alignItems="center" variant="h1" className={classes.title} style={{ margin: theme.spacing(7, 0, 2) }}>Attendance </Typography>
        <Typography align="left" alignItems="center" variant="h1" className={classes.title} style={{ paddingBottom: 40 }}>Board</Typography>
        <Typography align="left" alignItems="center" variant="h6" className={classes.credits} style={{ paddingBottom: 20 }}>Crafted and Built by:</Typography>

        <div className={classes.demo}>
          <List alignItems='flex-start' dense={dense}>

            <ListItem style={{ paddingBottom: 0 }} className={classes.credits}>
              <ListItemAvatar>
                <Avatar src={AvatarRamon}>A</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Avinia Luna Juan Carlos" />
            </ListItem>

            <ListItem style={{ paddingBottom: 0 }} className={classes.credits}>
              <ListItemAvatar>
                <Avatar src={AvatarRamon}>I</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Ibarra Pacheco Carlos Ivan" />
            </ListItem>

            <ListItem style={{ paddingBottom: 0 }} className={classes.credits}>
              <ListItemAvatar>
                <Avatar src={AvatarRamon}>R</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Manrique Figueroa Ramon" />
            </ListItem>

            <ListItem style={{ paddingBottom: 0 }} className={classes.credits}>
              <ListItemAvatar>
                <Avatar src={AvatarGonzalo}>G</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Aldana Chavez Gonzalo" />
            </ListItem>

            <ListItem style={{ paddingBottom: 0 }} className={classes.credits}>
              <ListItemAvatar>
                <Avatar>A</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Torres Ramirez Alan Antonio" />
            </ListItem>
          </List>
        </div>
        <Typography align="right" variant="body2" color="white" className={classes.credits} style={{ paddingRight: 30, paddingTop: 70 }}>
          {'Crafted with Love'}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4} md={6} elevation={4} align="center" alignItems="center" className={classes.rightDiv} >
        <Paper elevation={20} className="paper">
          <Lottie options={defaultOptions} height={200} width={200} className="lottie" />
          <form onSubmit={handleLogin}>
            <TextField name="email" type="email" fullWidth id="outlined-basic" className="" label="Username" margin="normal" variant="outlined" />
            <TextField name="password" type="password" fullWidth id="outlined-basic" className="" label="Password" margin="normal" variant="outlined" />
            <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: "#6200ea", color: 'white' }} className="btn-login">LOG IN</Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login