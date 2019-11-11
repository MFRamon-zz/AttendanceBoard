import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './components/Login/Login'
import PrivateRoute from './components/privateRoute'
import { AuthProvider } from './components/auth'

const App = () => {
    constructor() {
    super();
    firebase.initializeApp(config.firebaseConfig);
  }
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
};


  
export default App;
