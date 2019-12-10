import React, { Component, Fragment } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'
import Map from '../../components/Map/Map'
import FloatingActionButton from '../../components/PButton/PButton'

class Dashboard extends Component {

    state = {
        profesor: {
            name:"default",
            position:{
                lat: 21.152294,
                lng: -101.711238
            }
        }
    }

    showTeacherGeofence = params => {
        this.setState({profesor: params}, ()=> console.log("Dashboard: ", this.state.profesor))
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <Sidebar showTeacherGeofence={this.showTeacherGeofence}/>
                {/* <Map profesor={{name:"pali",coordinates:{lat:21.152294,lng:-101.711238}}} /> */}
                <Map profesor={this.state.profesor} />
                <FloatingActionButton/>
            </Fragment>
        );
    }
}

export default Dashboard;