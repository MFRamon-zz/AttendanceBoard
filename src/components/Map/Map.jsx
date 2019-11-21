import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  Circle,
  InfoWindow,
  Marker
} from "google-maps-react";
// import { getGeofences,  updateGeofence } from "../../helpers/querys"
import firebase from "firebase/app";
import "firebase/firestore";
import CircularProgress from '@material-ui/core/CircularProgress';

const coords = {
  lat: 21.152294,
  lng: -101.711238
};



export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      geofences: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},  
      loading: false,
      error: {
        status: false,
        message: ''
      }
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  // fetchPlaces(mapProps, map) {
  //   const {google} = mapProps;
  //   const service = new google.maps.places.PlacesService(map);
  // }


  // TODO cambiar manera en que se declara
  componentWillMount() {
    this.setState({ loading: true }, () => {
      
      let db = firebase.firestore();
      //let db;
      let citiesRef = db.collection('geofences');
      let query = citiesRef.where("course", "==", "J111").get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
          
          let newArry = [];
          snapshot.forEach(doc => {
            newArry.push(doc.data());
          });
          this.setState({geofences:newArry});
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    });
  }

  render() {
    const { geofences, loading, error} = this.state;

    return (

      <Map
        google={this.props.google}
        onReady={this.fetchPlaces}
        visible={true}

        initialCenter={{
          lat: 21.152294,
          lng: -101.711238
        }}
        zoom={20}
        onClick={this.onMapClicked}
        streetViewControl={false}
        zoomControlOptions={{ position: this.props.google.maps.ControlPosition.RIGHT_TOP }}
      >
      {loading ? (
        <div>
          <Marker
            title="Location"
            id={1}
            position={coords}
            draggable={false}
            onClick={this.onMarkerClick}
            icon={{
              url: "https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519540-077_Location-512.png",
              anchor: new this.props.google.maps.Point(8, 8),
              scaledSize: new this.props.google.maps.Size(16, 16)
            }}></Marker>
        </div>
        ) : error.status ? null : (
        geofences.map(g => {
          debugger;
            return(
              <Circle
              radius={5}
              center={g.coordinates}
              strokeColor='red'
              strokeOpacity={1}
              strokeWeight={10}
              fillColor='#FFFFFF'
              fillOpacity={0.3}
              >
              </Circle>
            );
          }))
        }
        {/* <Circle
          radius={5}
          center={coords}
          strokeColor='red'
          strokeOpacity={0}
          strokeWeight={10}
          fillColor='#FF22FF'
          fillOpacity={0.3}
        >
        </Circle> */}
          <Marker
            title="Location"
            id={1}
            position={coords}
            draggable={false}
            onClick={this.onMarkerClick}
            icon={{
              url: "https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519540-077_Location-512.png",
              anchor: new this.props.google.maps.Point(8, 8),
              scaledSize: new this.props.google.maps.Size(16, 16)
            }}
          >
          </Marker>
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h2>{this.state.selectedPlace.name}</h2>
              <p>{this.state.selectedPlace.name}</p>
            </div>
          </InfoWindow>
      </Map>
    );
    
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);

