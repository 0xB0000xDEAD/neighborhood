import React, { Component } from "react";

// import "../style/Main.css";
import { PageHeader } from "react-bootstrap";
import { Grid, Row, Col, Well, Button } from "react-bootstrap";

import Aside from "./Aside";

import dummy from "../response_dump";
import MyMap from "./MyMap";
import Details from "./Details";
// import myIcon from './icons8-save-as-50.png' // work
import myIcon from "./myIcon"; // work
import callAPI from "../utils/callApi";

class Main extends Component {
  state = {
    locations: dummy.response.groups[0].items, // import from dump
    places: [],
    filteredPlaces: [],
    // showDetails: false,
    placeInFocus: undefined,
    dataLoaded: false
  };

  componentDidMount() {
    let temp = []; // to set as state when all the data is fetched

    let loadData = () => {
      let dummy = {
        url: "http://localhost:3004/searchResponse",
        method: "GET"
      };
      let option = {
        url: "",
        method: "GET",
        qs: {
          client_id: "CLIENT_ID",
          client_secret: "CLIENT_SECRET",
          ll: "40.7243,-74.0018",
          query: "coffee",
          v: "20180323",
          limit: 1
        }
      };
      // console.log(callAPI(dummy)); // return a Request

      // alternative

      // fetch("http://localhost:3004/searchResponse").then(function(data) {
      //   console.log(data.json());
      // });

      callAPI(dummy).then(output => {
        let responseJ = JSON.parse(output);
        let data = responseJ.response.groups[0].items; // place array

        let imageProcess = Promise.all(
          data.map(el => {
            let dummy = {
              url: "http://localhost:3004/photoResponse",
              method: "GET"
            };
            let option = {
              url: `https://api.foursquare.com/v2/venues/${el.venue.id}/photos`,
              method: "GET",
              qs: {
                client_id: "1ZCYUXHNJK2TQYDJ5XMHVTXM2F5YW3V1P3W15YDWUTOBO1MN",
                client_secret:
                  "RHQ2UI1DMNO5HF1GTMO5YIHXZO12Z2PNUKVAF1ZRZURMZ2NI",
                v: "20180323",
                limit: 3
              }
            };
            return callAPI(dummy).then(function(output) {
              let response = JSON.parse(output);
              return `${
                response.response.photos.items[0].prefix
              }500x300${response.response.photos.items[0].suffix}`;
            });
          })
        );

        imageProcess.then(array => {
          function* gen() {
            for (const el of array) {
              yield el;
            }
          }
          for (const el of data) {
            let tmp = {
              id: el.venue.id,
              name: el.venue.name,
              location: el.venue.location,
              type: el.venue.categories[0].name,
              icon: undefined,
              isFocusOn: false,
              photos: gen().next()
            };
            temp.push(tmp);
          }
        });

        this.setState({ places: temp });
        this.setState({ filteredPlaces: temp });
        this.setState({ dataLoaded: true });
      });
    };
    // loadData();

    let loadStoredData = () => {
      let places = [];
      for (const el of this.state.locations) {
        // console.log(response.next();

        let tmp = {
          id: el.venue.id,
          name: el.venue.name,
          location: el.venue.location,
          type: el.venue.categories[0].name,
          icon: undefined,
          isFocusOn: false,
          photos: undefined
        };
        places.push(tmp);
      }

      this.setState({ places: places });
      this.setState({ filteredPlaces: places });
      this.setState({ dataLoaded: true });
    };
    loadStoredData();
  }

  testApi() {
    let option = {
      url: `https://api.foursquare.com/v2/venues/4b7fe3cbf964a520b94230e3/photos`,
      method: "GET",
      qs: {
        client_id: "1ZCYUXHNJK2TQYDJ5XMHVTXM2F5YW3V1P3W15YDWUTOBO1MN",
        client_secret: "RHQ2UI1DMNO5HF1GTMO5YIHXZO12Z2PNUKVAF1ZRZURMZ2NI",
        v: "20180323",
        limit: 3
      }
    };
    // console.log(callAPI(option));
  }
  search = event => {
    let query = event.target.value;
    console.log(`query is ${query}`);
    if (query) {
      let results = this.state.places.filter(el => {
        return el.type.toLowerCase() === query.toString().trim();
      });
      if (results.length > 0) {
        this.setState({ filteredPlaces: results });
      }
    } else {
      this.setState({ filteredPlaces: this.state.places });
    }
  };
  setFocusOnMarker = (id, event) => {
    let tmp = this.state.filteredPlaces.reduce((store, el) => {
      if (el.id === id) {
        el.icon = myIcon;
        store.push(el);
      } else {
        el.icon = undefined;
        store.push(el);
      }
      return store;
    }, []);
    this.setState({ filteredPlaces: tmp });
  };

  // called from list or marker
  diveInDetails = id => {
    let target = this.state.filteredPlaces.filter(el => el.id === id)[0];

    this.setState({ placeInFocus: target });
  };

  render() {
    // console.log(this.state);
    if (this.state.dataLoaded) {
      return (
        <main>
          <Grid>
            <Row className="show-grid">
              <Col xs={12} sm={3}>
                <Aside
                  places={this.state.filteredPlaces}
                  search={this.search}
                  setFocusOnMarker={this.setFocusOnMarker}
                  diveInDetails={this.diveInDetails}
                />
              </Col>
              <Col xs={12} sm={9}>
                <PageHeader className="header">
                  Neighborhood
                  <small> a demo project</small>
                </PageHeader>
                <hr />
                <Button onClick={this.testApi}>test the API</Button>
                <Well>
                  <MyMap places={this.state.filteredPlaces} />
                </Well>
                <hr />
                <Details place={this.state.placeInFocus} />
              </Col>
            </Row>
          </Grid>
        </main>
      );
    } else {
      return (
        <div>
          <span>loading... please wait</span>
        </div>
      );
    }
  }
}

export default Main;
