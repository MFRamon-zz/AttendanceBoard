import React, { Component, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Lottie from 'react-lottie'
import animationData from '../../anim/animation.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Login extends Component {
    constructor(props) {
        super(props);
        this.changeRoute = this.changeRoute.bind(this);
    };
    changeRoute (){
        let path = '/dashboard';
        this.props.history.push(path);
    }

    render() {
        
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
                <Lottie options={defaultOptions} height={500} width={500} className="lottie"/>
                </div>
                <Paper className="paper">
                    <Avatar className="avatar">
                        <FontAwesomeIcon icon={faChalkboardTeacher} className="icon" size="lg"/>
                    </Avatar>
                    <TextField fullWidth id="outlined-basic" className=""
                            label="Username"margin="normal" variant="outlined"/>

                    <TextField fullWidth id="outlined-basic" className=""
                            label="Password"margin="normal" variant="outlined"/>

                    <Button fullWidth variant="contained" color="primary" className="btn-login" onClick={this.changeRoute}>
                        LOG IN
                    </Button>

                    <Typography>
                        <Link href="#" to="dashboard"  className="">
                            Don't have an account? Sign Up
                        </Link>
                    </Typography>

                    
                </Paper>
            </div>
        );
    }
}

export default Login;