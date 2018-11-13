import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import style from "./style.json";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyCnFVAyZgmwJeECuz5mpLxfEsqQPYMzOSo&v=3",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div id="map" style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={10}
    defaultOptions={{
      styles: style,
      mapTypeControl: false
    }}
    center={props.centerPos}
  >
    {props.places.map(element => {
      let markerId = element.id;
      return (
        props.isMarkerShown && (
          <Marker
            animation={"DROP"}
            title={element.name}
            // label={markerId}
            key={element.id}
            position={{
              lat: element.location.lat,
              lng: element.location.lng
            }}
            onMouseOver={e => {
              props.onMouseOver(markerId, e);
            }}
            onClick={e => {
              props.onMarkerClick(markerId, e);
            }}
            icon={element.icon}
          >
            {element.isSelected && (
              <InfoWindow /* onCloseClick={props.closeInfo} */>
                <h5>{element.name}</h5>
              </InfoWindow>
            )}
          </Marker>
        )
      );
    })}
  </GoogleMap>
));

class MyMap extends React.PureComponent {
  state = {
    isMarkerShown: false,
    position: {},
    clickedMarker: this.props.placeInFocus
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let pos = {};
    if (nextProps.places.length > 0) {
      pos.lat = nextProps.places[0].location.lat;
      pos.lng = nextProps.places[0].location.lng;
      if (nextProps.placeInFocus === undefined) {
        // console.log("no placeInFocus defined");
        return { position: pos };
      } else {
        // console.log(nextProps.placeInFocus.location);
        pos.lat = nextProps.placeInFocus.location.lat;
        pos.lng = nextProps.placeInFocus.location.lng;
        return { position: pos };
      }
    } else {
      return null;
    }
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 1500);
  };

  handleMarkerClick = (id, e) => {
    this.props.diveInDetails(id, e);
  };

  handleMarkerOver = (id, e) => {
    this.props.setFocusOnMarker(id, e);
  };

  render() {
    return (
      <div>
        {this.props.dataLoaded && (
          <MyMapComponent
            onMarkerClick={this.handleMarkerClick}
            onMouseOver={this.handleMarkerOver}
            places={this.props.places}
            centerPos={this.state.position}
            isMarkerShown={this.state.isMarkerShown}
            placeInFocus={this.props.placeInFocus}
          />
        )}
      </div>
    );
  }
}

export default MyMap;
