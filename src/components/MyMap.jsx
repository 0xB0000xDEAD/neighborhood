import React from "react";
import { compose, withProps /* withHandlers */ } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyCnFVAyZgmwJeECuz5mpLxfEsqQPYMzOSo&v=3",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: (
      <div /* className="test" */ style={{ height: `400px` }} />
    ),
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref={ref => {
      this.map = ref;
    }}
    defaultZoom={10}
    defaultCenter={props.centerPos}
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
            onMouseOut={e => {
              props.onMouseOver(null, e);
            }}
            onClick={e => {
              this.map.panTo({
                lat: element.location.lat,
                lng: element.location.lng
              });
              props.onMarkerClick(markerId, e);
            }}
            icon={element.icon}
          >
            {element.isFocusOn && (
              <InfoWindow /* onCloseClick={props.onToggleOpen} */>
                <p>{element.name}</p>
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
    position: {}
  };

  componentDidMount() {
    this.delayedShowMarker();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.places.length > 0) {
      let pos = {};
      pos.lat = nextProps.places[0].location.lat;
      pos.lng = nextProps.places[0].location.lng;
      return {
        position: pos
      };
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
    // console.log(e);
    this.props.setFocusOnMarker(id, e);
  };

  render() {
    return (
      <MyMapComponent
        onMarkerClick={this.handleMarkerClick}
        onMouseOver={this.handleMarkerOver}
        places={this.props.places}
        centerPos={this.state.position}
        isMarkerShown={this.state.isMarkerShown}
      />
    );
  }
}

export default MyMap;
