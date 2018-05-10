import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import myIcon from "./myIcon";

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
  // console.log(props.places),
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{
      lat: props.places[0].location.lat,
      lng: props.places[0].location.lng
    }}
  >
    {props.places.map(element => {
      return (
        <Marker
          defaultAnimation={"drop"}
          key={element.id}
          position={{
            lat: element.location.lat,
            lng: element.location.lng
          }}
          // onClick={props.onMarkerClick}
          onMouseOver={props.onMouseOver}
          icon={element.icon}
        >
          {/* <InfoWindow>
                  <h3>{element.name}</h3>
                </InfoWindow> */}
        </Marker>
      );
    })}
  </GoogleMap>
));

class MyMap extends React.PureComponent {
  state = {
    isMarkerShown: true
  };

  componentDidMount() {
    this.delayedShowMarker();
    // aggiunta
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };
  
  handleMouseOver(e) {}

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        onMouseOver={this.handleMouseOver}
        places={this.props.places}
      />
    );
  }
}

export default MyMap;
