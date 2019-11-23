import React, { Component, Fragment } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'
import Map from '../../components/Map/Map'
import FloatingActionButton from '../../components/PButton/PButton'

class Dashboard extends Component {

    componentDidMount(){
        //Fecht active professors from firebase
    }

    state={
        data: null
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <Sidebar data={this.state.data}/>
                <Map/>
                <FloatingActionButton/>
            </Fragment>
        );
    }
}

export default Dashboard;