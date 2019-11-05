import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import * as firebase from "firebase/app";
import config from "./config";

class App extends Component {
  constructor() {
    super();
    firebase.initializeApp(config.firebaseConfig);
  }

  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route path="/" component={Dashboard} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;
