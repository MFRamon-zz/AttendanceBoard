import React, { Component, Fragment } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'

class Dashboard extends Component {
    render() {
        return (
            <Fragment>

                <Header/>
                <Sidebar/>

            </Fragment>
        );
    }
}

export default Dashboard;