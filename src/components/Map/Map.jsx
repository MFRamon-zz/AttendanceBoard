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
import Slider from '@material-ui/core/Slider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';


const styles = {
  geofenceForm:{
    zIndex: 9999,
    position: "absolute",
    bottom: 0,
    left: "50%",
    right: "50%",
    marginBottom: 25
  },
  paper:{    
    borderRadius: 50,
    minWidth: 275,
    width: 100,
    height: 65,
    textAlign:"center",
    display: "inline",
    float: "left"
  },
  slider:{
    marginTop: "10px",
    width: "70%"
  },
  addGeofenceButton:{
    height: 65,
    width: 65,
    marginLeft: 15
  }
};

const coords = {
  lat: 21.152294,
  lng: -101.711238
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];



export class MapContainer extends Component {

  handleClickOpen = () => {
    this.setState({open:true});
  };

  handleClose = () => {
    this.setState({open:false});
  };  

  constructor(props) {
    super(props);
    this.state = {
      newGeofenceRadius:10,
      geofences: [],
      creatingGeofence:false,
      modalClassroom: false,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      loading: false,
      open:false,
      personName: "",
      error: {
        status: false,
        message: ''
      }
    };
  }
  initMap(mapProps, map) {
    var self = this;
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
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

  // TODO cambiar manera en que se declara
  // componentWillMount() {
  //   this.setState({ loading: true }, () => {
  //     let db = firebase.firestore();
  //     //let db;
  //     let citiesRef = db.collection('geofences');
  //     let query = citiesRef.where("course", "==", "J111").get()
  //       .then(snapshot => {
  //         if (snapshot.empty) {
  //           console.log('No matching documents.');
  //           return;
  //         }

  //         let newArry = [];
  //         snapshot.forEach(doc => {
  //           newArry.push(doc.data());
  //         });
  //         this.setState({ geofences: newArry });
  //       })
  //       .catch(err => {
  //         console.log('Error getting documents', err);
  //       });
  //   });
  // }

  render() {
    const { geofences, loading, error } = this.state;  
    return (
      <div>
        <Map
          google={this.props.google}
          google={window.google} 
          onReady={this.initMap}
          visible={true}
          initialCenter={{
            lat: 21.152294,
            lng: -101.711238
          }}
          zoom={20}
          onClick={(e,map,c)=>{
              //create the geofence and add it to the this.state.geofences array
              let currentGeofences = this.state.geofences;
              let newGeofence = {
                radius:20,
                coords:c.latLng
              };
              currentGeofences.pop();
              currentGeofences.push(newGeofence);
              this.setState({geofences:currentGeofences,creatingGeofence:true});
          }}
          streetViewControl={false}
          zoomControlOptions={{ position: this.props.google.maps.ControlPosition.RIGHT_TOP }}
          yesIWantToUseGoogleMapApiInternals={true}
        >
          {this.state.geofences.map((circle) => {
            return(<Circle
            id="geofence"
            radius={this.state.newGeofenceRadius}
            center={circle.coords}
            strokeColor='red'
            strokeOpacity={1}
            strokeWeight={1}
            fillColor='#FF22FF'
            fillOpacity={0.3}
            draggable={false}
            editable={false}
            >
            </Circle>)
          })}
        
          {/* <Marker
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
          </Marker> */}
          {/* <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h2>{this.state.selectedPlace.name}</h2>
              <p>{this.state.selectedPlace.name}</p>
            </div>
          </InfoWindow> */}
        </Map>
        { this.state.creatingGeofence ? (
            <div style={styles.geofenceForm}>
            <Paper style={styles.paper}>
              <Slider
                id="sldRadius"
                defaultValue={20}
                style={styles.slider}
                aria-labelledby="discrete-slider-custom"
                step={1}
                valueLabelDisplay="auto"
                onChange={(object,value)=>{
                  this.setState({newGeofenceRadius:value});
                }}
              />
              <Typography component="p">
                Geofence Radius
              </Typography>
            </Paper>
            <Fab
              style={styles.addGeofenceButton}
              color="secondary"
              aria-label="add"
              onClick={()=>{
                this.setState()
              }}
            >
              <SaveIcon />
            </Fab>
          </div>  
          ):null}
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To create the new geofence for a classroom, please complete the following form.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Courses"
                type="email"
                fullWidth
              />
              <FormControl >
                <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={"hola mundo"}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div >
                      {selected.map(value => (
                        <Chip key={value} label={value}  />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name} >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={console.log("close")} color="primary">
                Cancel
              </Button>
              <Button onClick={console.log("clicked")} color="primary">
                Accept
              </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);
