import React, { Component, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import * as authentication from "../../helpers/auth";

class SignUp extends Component {
  render() {
    const registerNewUser = useCallback(async event => {
      const { email, password } = event.target.elements;
      console.log(email);
      console.log(password);

      await authentication.CreateUser(email, password);
      console.log("Usuario registrado");
    });

    return (
      <div backgroundColor="blue">
        <Grid
          item
          xs={12}
          sm={4}
          md={6}
          elevation={4}
          align="center"
          alignItems="center"
          // className={classes.rightDiv}
        >
          <Paper elevation={20} className="paper">
            <form onSubmit={registerNewUser}>
              <TextField
                name="email"
                type="email"
                fullWidth
                id="outlined-basic"
                className=""
                label="Username"
                margin="normal"
                variant="outlined"
              />
              <TextField
                name="password"
                type="password"
                fullWidth
                id="outlined-basic"
                className=""
                label="Password"
                margin="normal"
                variant="outlined"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#6200ea", color: "white" }}
                className="btn-login"
              >
                REGISTER
              </Button>
            </form>
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default SignUp;
