import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";

//Firebase conf file.
import app from "../../config/firebaseConfig"

//Authentication object 
import { AuthContext } from "../auth";

//Lottie Library
import Lottie from 'react-lottie'

//Local Animation
import animationData from '../../anim/animation.json'

//Material UI library
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";


const Login = ({ history }) => {
  //Function to handle Login
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

  //Verifies if the current user has an active session
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }

  //Object for styling the component
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  
  return (
    <div className="container-flex">
      <div className="lottie-parent">
        <Lottie options={defaultOptions} height={500} width={500} className="lottie" />
      </div>
      <Paper className="paper">
        <Avatar className="avatar">
          <FontAwesomeIcon icon={faChalkboardTeacher} className="icon" size="lg" />
        </Avatar>
        <form onSubmit={handleLogin}>
          <TextField name="email" type="email" fullWidth id="outlined-basic" className="" label="Username" margin="normal" variant="outlined" />
          <TextField name="password" type="password" fullWidth id="outlined-basic" className="" label="Password" margin="normal" variant="outlined" />
          <Button type="submit" fullWidth variant="contained" color="primary" className="btn-login">LOG IN</Button>
        </form>
      </Paper>
    </div>
  );
};

export default withRouter(Login);
