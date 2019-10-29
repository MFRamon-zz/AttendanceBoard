import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from "react-router-dom";
import MapContainer from './components/Map/Map'
import Professor from './components/Professor/Professor';
 
const routing = (
    <Router>
      <div>
        <Route exact path="/" component={Professor} />
        <Route exact path="/second" component={MapContainer} />
      </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
