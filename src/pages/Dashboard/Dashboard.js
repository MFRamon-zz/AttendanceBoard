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
        
        data: [ {
            name: 'Sagrario',
            active: true,
            position: [],
            role: 'teacher',
            uid: '1',
            attendance: []
        },
        {
            name: 'Atilano',
            active: true,
            position: [],
            role: 'teacher',
            uid: '1',
            attendance: []
        },
        {
            name: 'Palafox',
            active: true,
            position: [],
            role: 'teacher',
            uid: '3',
            attendance: []
        }
    ]
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