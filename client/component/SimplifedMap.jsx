import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import PropTypes from 'prop-types';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class SimplifiedMap extends Component {

  constructor(props) {
    super(props);
  }
  
  getDefaultProps() {
    return {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };
  }

  render() {
      return (
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: -1.2884,
            lng: 36.8233
          }}
        >
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{lat: 37.778519, lng: -122.405640}} /> 
        </Map>
      );
    }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyD24fO96Lsk2K_ZNdIgxCr_gwKpFg6xlpo'
})(SimplifiedMap);