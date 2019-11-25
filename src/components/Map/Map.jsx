import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  Circle,
  InfoWindow,
  Marker
} from "google-maps-react";
import { getGeofences, updateGeofence, getClassroomById } from "../../helpers/queries";
import Slider from "@material-ui/core/Slider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./styles";
import DialogForm from "../DialogForm/DialogForm";

// const coords = {
//   lat: 21.152294,
//   lng: -101.711238
// };

export class MapContainer extends Component {

  /**
   * Event handler after pressing the Save Fab button next to radio slider. 
   * It shows the form and hides the slider radio selector by setting the state of creatingGeofence as false.
  **/
  handleClickOpen = () => {
    this.setState({ creatingGeofence: false, dialogForm: { open: true } });
  };
  /**
   * Event handler after pressing Cancel button inside Dialog Form modal. 
   * It hides the form but keeps the UI ready to modify the new geofence. 
  **/
  handleCancel = () => {
    this.setState({ creatingGeofence: true, dialogForm: { open: false } });
  };
  /**
   * Event handler after pressing Accept button inside Dialog Form modal. 
   * It hides the form but keeps the UI ready to modify the new geofence. 
  **/
  handleGeofenceComplete = () => {
    this.setState({ creatingGeofence: false, dialogForm: { open: false } });
    //TODO: clear the map and call the method that will paint all geofences from db.
  };

  constructor(props) {
    super(props);
    this.state = {
      google: null,
      newGeofenceRadius: 10,
      geofences: [],
      creatingGeofence: false,
      modalClassroom: false,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      loading: false,
      dialogForm: {
        open: false
      },
      personName: "",
      error: {
        status: false,
        message: ""
      },
      selectedMarker:{
        title:"Clasroom",
        description:"body"
      }
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  /**
   * This method calls for the backend bringing the information of the selected marker (class room).
   * @param {string} Id The Id reference we got from the geofence firebase object. 
   * @param {object} props Props passed in order to display/hide the InfoWindow.
   */
  getClassroomWithId = async(Id,props) => {
    const { selectedPlace, activeMarker, showingInfoWindow } = props;
    try {
      let res = await getClassroomById(Id);
      let clasroom = res.name;
      console.log(res);
      // this will re render the view with new data
      this.setState({selectedMarker:{description:clasroom,title:"Clasroom"},selectedPlace, activeMarker, showingInfoWindow });
    } catch (err) {
      console.log(err);
    }
  }


  /**
   * Called after clicking on a marker.
   *
   * @param {object} props Props passed 
   * @param {object} marker the marker itself element
   * @param {object} e Event
   */
  onMarkerClick = (props, marker, e) => {
    const markerState = {
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    };
    this.getClassroomWithId(props.reference, markerState );
  };
  
  /**
   * Called after clicking on a marker.
   *
   * @param {object} props Props passed 
   */

  onMapClick = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  /**
   * Called before mounting the component Map. It will bring all geofences and save them on the component state.
   **/
  async componentWillMount() {
    let allgeofences = await getGeofences();
    this.setState({ geofences: allgeofences });
  }

  render() {
    const { geofences, loading, error } = this.state;
    if (this.props.google) {
      return (
        <div>
          <Map
            google={window.google}
            onReady={this.initMap}
            visible={true}
            initialCenter={{
              lat: 21.152294,
              lng: -101.711238
            }}
            zoom={18}
            onClick={(e, map, c) => {
              //create the geofence and add it to the this.state.geofences array
              let currentGeofences = this.state.geofences;
              let newGeofence = {
                lenght: 20,
                coordinates: {
                  latitude:c.latLng.lat(),
                  longitude:c.latLng.lng()
                }
              };
              currentGeofences.pop();
              currentGeofences.push(newGeofence);
              this.setState({
                geofences: currentGeofences,
                creatingGeofence: true
              });
            }}
            streetViewControl={false}
            zoomControlOptions={{
              position: this.props.google.maps.ControlPosition.RIGHT_TOP
            }}
            yesIWantToUseGoogleMapApiInternals={true}
          >
            {this.state.geofences.map(circle => {
              let lat = circle.coordinates.latitude;
              let lng = circle.coordinates.longitude;
              const latLng = { lat, lng };
              return (
                <Circle
                  id="geofence"
                  radius={circle.lenght}
                  center={latLng}
                  strokeColor="red"
                  strokeOpacity={1}
                  strokeWeight={1}
                  fillColor="#FF22FF"
                  fillOpacity={0.3}
                  draggable={false}
                  editable={false}
                ></Circle>
              );
            })}
            {this.state.geofences.map(marker => {
              let lat = marker.coordinates.latitude;
              let lng = marker.coordinates.longitude;
              const latLng = { lat, lng };
              return (
                <Marker
                  onClick={this.onMarkerClick}
                  {...this.props}
                  position={latLng}
                  icon={{
                    url:
                      "https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519540-077_Location-512.png",
                    anchor: new this.props.google.maps.Point(8, 8),
                    scaledSize: new this.props.google.maps.Size(16, 16)
                  }}
                  reference={marker.classroom.id}
                  title="The marker"
                  name={JSON.stringify(latLng)}
                />
              );
            })}
            <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            >
            <Paper>
              <Typography variant="headline" component="h4">
                {this.state.selectedMarker.title}
              </Typography>
              <Typography component="p">
                {this.state.selectedMarker.description}
              </Typography>
            </Paper>
            </InfoWindow>
          </Map>
          {this.state.creatingGeofence ? (
            <div style={styles.geofenceForm}>
              <Paper style={styles.paper}>
                <Slider
                  id="sldRadius"
                  defaultValue={20}
                  style={styles.slider}
                  aria-labelledby="discrete-slider-custom"
                  step={1}
                  valueLabelDisplay="auto"
                  onChange={(object, value) => {
                    this.setState({ newGeofenceRadius: value });
                  }}
                />
                <Typography component="p">Geofence Radius</Typography>
              </Paper>
              <Fab
                style={styles.addGeofenceButton}
                color="secondary"
                aria-label="add"
                onClick={() => {
                  this.handleClickOpen();
                }}
              >
                <SaveIcon />
              </Fab>
            </div>
          ) : null}
          <DialogForm
            open={this.state.dialogForm.open}
            handleCancel={this.handleCancel.bind(this)}
            handleGeofenceComplete={this.handleGeofenceComplete.bind(this)}
          />
        </div>
      );
    } else {
      return <h1>loading google maps...</h1>;
    }
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);
