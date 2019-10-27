import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        center={{
          lat: 21.1495134,
          lng: -101.7182172
        }}
        zoom={15}>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);