import React, { Component, Fragment } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/privateRoute";
import { AuthProvider } from "./helpers/auth";
import app from "../src/config/firebaseConfig";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }
  //Method for verifying that the user is still logged in
  componentDidMount() {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user
        });
      }
    });
  }

  //   // Create a new theme using Nunito Sans
  // theme = createMuiTheme({
  //   typography: {
  //     fontFamily: "Montserrat, Roboto, sans-serif"
  //   }
  // });

  render() {
    return (
      // <MuiThemeProvider theme={theme}>
      // </MuiThemeProvider>
      <AuthProvider>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500"
        />
        <Router>
          <div>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/professor" component={AddProfessor} />
          </div>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
