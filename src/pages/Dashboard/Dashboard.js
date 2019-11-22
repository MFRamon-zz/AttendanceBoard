import React, { Component, Fragment } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'
import Map from '../../components/Map/Map'
import FloatingActionButton from '../../components/PButton/PButton'

class Dashboard extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <Sidebar/>
                <Map/>
                <FloatingActionButton/>
            </Fragment>
        );
    }
}

export default Dashboard;