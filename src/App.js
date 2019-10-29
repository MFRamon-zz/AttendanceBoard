import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route ,Switch, Redirect} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard'

class App extends Component {
  render() {
    return (
      <Fragment>

        <Router>
          <Switch>
            <Route path="/" component={Dashboard}/>
          </Switch>
        </Router>

      </Fragment>
    );
  }
}

export default App;
