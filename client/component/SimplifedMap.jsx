import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class SimplifiedMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      naturalDisasters: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {
        metaData: {
          Date: null,
          Location: null,
          Country: null,
          Continent: null
        }
      }
    };
  }
  
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  componentDidMount() {
    fetch("http://localhost:3002/AngelViewApi/v1/naturalDisaster")
    .then((res) => res.json())
    .then((result) => {
      this.setState({
        isLoaded: true,
        naturalDisasters: result,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {
          metaData: {
            Date: null,
            Location: null,
            Country: null,
            Continent: null
          }
        }
      });
    }),
    (error) => {
      this.setState({
        isLoaded: true,
        error
      })
    }
  }
  

  render() {
      let {isLoaded, naturalDisasters} = this.state;

      if (isLoaded) {
        let markers = naturalDisasters.reduce((memo, disaster) => {
          let info = (disaster.hbox).split('<br>');
          let metaData = info.reduce((infoMemo, info) => {
            let infos = info.split(":");
            infoMemo[infos[0]] = (info.replace(`${infos[0]}:`, '')).trim();
            return infoMemo;
          }, {});
          memo.push(<Marker
            onClick={this.onMarkerClick.bind(this)}
            title={disaster.title}
            name={disaster.title}
            position={{lat: disaster.lat, lng: disaster.lon}} 
            metaData={metaData}
            /> );
          return memo;
        }, []);
        return (
          <Map
            google={this.props.google}
            zoom={2}
            style={mapStyles}
            initialCenter={{
              lat: -1.2884,
              lng: 36.8233
            }}
            > 
            {markers.map((marker) => {return (marker); })}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>Event: {this.state.selectedPlace.title}</h4>
                <h4>Date: {this.state.selectedPlace.metaData.Date}</h4>
                <h4>Location: {this.state.selectedPlace.metaData.Location}</h4>
                <h4>Country: {this.state.selectedPlace.metaData.Country}</h4>
                <h4>Continent: {this.state.selectedPlace.metaData.Continent}</h4>
              </div>
            </InfoWindow>
          </Map>
        );
      }
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
        </Map>
      );
    }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyD24fO96Lsk2K_ZNdIgxCr_gwKpFg6xlpo'
})(SimplifiedMap);