import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Circle, Marker, InfoWindow } from 'react-google-maps';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const host = "http://localhost:3002/";

export default class SimplifiedMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapProperties: {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 2
      },
      circleProperties: {
        radius: 0
      },
      error: null,
      isLoaded: false,
      naturalDisasters: [],
      showingInfoWindow: false,
      activeMarker: {
        metaData: {
          Date: null,
          Location: null,
          Country: null,
          Continent: null
        }
      },
      infoBoxOpen: false,
      showCircle: false
    };
  }
  
  onMarkerClick(selectedMarkerInfo) {
    this.props.infoWrapperCallback(selectedMarkerInfo, true, false);
    this.setState({
      activeMarker: selectedMarkerInfo,
      showingInfoWindow: true,
      mapProperties: {
        center: selectedMarkerInfo.position,
        zoom: 12
      },
      circleProperties: {
        radius: 5000
      },
      infoBoxOpen: true,
      showCircle: true
    });
  }

  onMapClick() {
    this.props.clickOnMap(true);
    this.setState({
      showCircle: false,
      infoBoxOpen: false
    })
  }

  componentDidMount() {
    fetch(`https://comp-5130.herokuapp.com/AngelViewApi/v1/naturalDisaster`)
    .then((res) => res.json())
    .then((result) => {
      this.setState({
        isLoaded: true,
        naturalDisasters: result,
        showingInfoWindow: false,
        activeMarker: {
          metaData: {
            Date: null,
            Location: null,
            Country: null,
            Continent: null
          }
        },
        circleProperties: {
          radius: 0
        },
        mapProperties: {
          center: {
            lat: -1.2884,
            lng: 36.8233
          },
          zoom: 2
        },
        infoBoxOpen: false,
        showCircle: false
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
      let {isLoaded, naturalDisasters, mapProperties, circleProperties} = this.state;
      
      let GoogleMapComp = withGoogleMap(props => (
        <GoogleMap
          defaultCenter = {mapProperties.center}
          defaultZoom = {mapProperties.zoom}
        />
      ));

      if (isLoaded) {
        let markers = naturalDisasters.reduce((memo, disaster) => {
          let isEarthquake = (disaster.title).includes('arthquake') ? true : false;
          let info = (disaster.hbox).split('<br>');
          let metaData = info.reduce((infoMemo, info) => {
            if (info.includes('href')) {
              let replacedLink = info.replace('<a href=\'', '');
              infoMemo["link"] = `http://hisz.rsoe.hu/alertmap/${(replacedLink.replace('\'>More details</a>', '')).trim()}`;
            } else {
              let infos = info.split(":");
              infoMemo[infos[0]] = (info.replace(`${infos[0]}:`, '')).trim();  
            }
            return infoMemo;
          }, {});
          if (isEarthquake) {
            console.log(metaData);
          }
          let markerInfo = {
            title: disaster.title,
            name: disaster.title,
            position: {lat: Number(disaster.lat), lng: Number(disaster.lon)},
            description: disaster.Description,
            metaData,
            isEarthquake
          };

          let icon = isEarthquake ? "Earthquake.png" : disaster.icon;

          memo.push(<Marker
            onClick={this.onMarkerClick.bind(this, markerInfo)}
            position={new google.maps.LatLng(Number(disaster.lat), Number(disaster.lon))}
            icon={`https://comp-5130.herokuapp.com/public/logos/${icon}`}
            />);
          return memo;
        }, []);

        GoogleMapComp = withGoogleMap(props => (
          <GoogleMap
            center = {mapProperties.center}
            zoom = {mapProperties.zoom}
          >
            {markers.map((marker) => {return (marker); })}
            {
              this.state.infoBoxOpen && <InfoWindow
              position={mapProperties.center}
              options={{
                maxWidth: 500,
                pixelOffset: new google.maps.Size(0, -20),
                disableAutoPan: true,
                enableEventPropagation: true
              }}
            >
              <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `12px` }}>
                <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                  {`${this.state.activeMarker.title} at ${this.state.activeMarker.metaData.Location} on ${this.state.activeMarker.metaData.Date}`}
                </div>
              </div>
            </InfoWindow>}
            <Circle 
              radius={circleProperties.radius}
              center={ mapProperties.center }
              visible={this.state.showCircle}
              options={{
                strokeColor: 'transparent',
                strokeOpacity: 0,
                strokeWeight: 5,
                fillColor: '#FF0000',
                fillOpacity: 0.2
              }}
            />
          </GoogleMap>
        ));
      }
      return (
        <GoogleMapComp 
          containerElement={ <div style={mapStyles} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      );
    }
}