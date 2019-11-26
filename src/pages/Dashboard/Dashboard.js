import React, { Component, Fragment } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'
import Map from '../../components/Map/Map'
import FloatingActionButton from '../../components/PButton/PButton'

class Dashboard extends Component {

    state = {
        profesor: {
            
        }
    }

    showTeacherGeofence = params => {

        //console.log("PARAMS: ", params)
        const prof = params
        this.setState({profesor: prof}, ()=> console.log("Dashboard: ", this.state.profesor))

    }

    render() {
        return (
            <Fragment>
                <Header/>
                <Sidebar showTeacherGeofence={this.showTeacherGeofence}/>
                {/* <Map profesor={{name:"pali",coordinates:{latitude:0.0,longitude:0.0}}} /> */}
                <Map profesor={this.state.profesor} />
                <FloatingActionButton/>
            </Fragment>
        );
    }
}

export default Dashboard;