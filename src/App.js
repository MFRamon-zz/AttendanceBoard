import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route ,Switch, Redirect} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'

class App extends Component {
  render() {
    return (
      <Fragment>

        <Router>
          <Switch>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/login" component={Login}/>
          </Switch>
        </Router>

      </Fragment>
    );
  }
}

export default App;
