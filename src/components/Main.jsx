import React, { Component } from "react";

import port from "../config";

// import "../style/Main.css";
import { PageHeader } from "react-bootstrap";
import { Grid, Row, Col, Well, Button } from "react-bootstrap";



import Aside from "./Aside";

import dummy from "../response_dump";
import MyMap from "./MyMap";
import Details from "./Details";
import focusPin from "../icons/baseline-place-24px_1.svg";
import defaultPin from "../icons/baseline-place-24px_2.svg";
import callAPI from "../utils/callApi";

class Main extends Component {
  state = {
    locations: dummy.response.groups[0].items, // import from dump
    places: [],
    filteredPlaces: [],
    // showDetails: false,
    placeInFocus: undefined, // place to show the details
    dataLoaded: false
  };

  componentDidMount() {
    let temp = []; // to set as state when all the data is fetched

    let loadData = () => {
      let dummy = {
        url: `http://localhost:${port}/searchResponse`,

        method: "GET"
      };
      let option = {
        url: "https://api.foursquare.com/v2/venues/search",
        method: "GET",
        qs: {
          client_id: "1ZCYUXHNJK2TQYDJ5XMHVTXM2F5YW3V1P3W15YDWUTOBO1MN",
          client_secret: "RHQ2UI1DMNO5HF1GTMO5YIHXZO12Z2PNUKVAF1ZRZURMZ2NI",
          ll: "40.7243,-74.0018",
          query: "lake",
          v: "20180323",
          limit: 15
        }
      };
      let search = {
        url: "https://api.foursquare.com/v2/venues/search",
        method: "GET",
        qs: {
          client_id: "1ZCYUXHNJK2TQYDJ5XMHVTXM2F5YW3V1P3W15YDWUTOBO1MN",
          client_secret: "RHQ2UI1DMNO5HF1GTMO5YIHXZO12Z2PNUKVAF1ZRZURMZ2NI",
          near: "los angeles",
          // query: "lake",
          categoryId: "4bf58dd8d48988d167941735",
          // radius: "50000",
          v: "20180323",
          limit: 10
        }
      };

      // alternative

      // fetch("http://localhost:3004/searchResponse").then(function(data) {
      //   console.log(data.json());
      // });

      callAPI(search).then(output => {
        let responseJ = JSON.parse(output);
        // console.log(responseJ);

        let data = responseJ.response.venues; // place array

        let imageProcess = Promise.all(
          data.map(el => {
            let dummy = {
              url: `http://localhost:${port}/photoResponse`,
              method: "GET"
            };

            let details = {
              url: `https://api.foursquare.com/v2/venues/${el.id}`,
              method: "GET",
              qs: {
                client_id: "1ZCYUXHNJK2TQYDJ5XMHVTXM2F5YW3V1P3W15YDWUTOBO1MN",
                client_secret:
                  "RHQ2UI1DMNO5HF1GTMO5YIHXZO12Z2PNUKVAF1ZRZURMZ2NI",
                v: "20180323",
                limit: 1
              }
            };
            return callAPI(dummy).then(function(output) {
              // console.log(output);
              
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
            // console.log(el.url); // check if a attribute is present

            let tmp = {
              id: el.id,
              name: el.name,
              location: el.location,
              type: el.categories[0].name,
              description: el.description,
              url: el.url,
              icon: defaultPin,
              isFocusOn: false,
              areWeHovering: false,
              photos: gen().next().value
            };
            temp.push(tmp);
          }
          this.setState({ places: temp });
          this.setState({ filteredPlaces: temp });
          this.setState({ dataLoaded: true });
        });
      });
    };
    loadData();

    let loadStoredData = () => {
      let places = [];
      for (const el of this.state.locations) {
        // console.log(response.next();

        let tmp = {
          id: el.venue.id,
          name: el.venue.name,
          location: el.venue.location,
          type: el.venue.categories[0].name,
          description: el.venue.description,
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
    // loadStoredData();
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
      } else {
        this.setState({ filteredPlaces: [] });
      }
    } else {
      this.setState({ filteredPlaces: this.state.places });
    }
  };
  setFocusOnMarker = (id, event) => {
    let tmp = this.state.filteredPlaces.reduce((store, el) => {
      if (el.id === id) {
        el.icon = focusPin;
        el.areWeHovering = true;
        store.push(el);
      } else {
        el.icon = defaultPin;
        el.areWeHovering = false;

        store.push(el);
      }
      return store;
    }, []);
    this.setState({ filteredPlaces: tmp });
  };

  // called from list or marker

  diveInDetails = (id, event) => {
    let target;
    let tmp = this.state.filteredPlaces.reduce((store, el) => {
      if (el.id === id) {
        target = el;
        el.isFocusOn = true;
        store.push(el);
      } else {
        el.isFocusOn = false;
        store.push(el);
      }
      return store;
    }, []);
    this.setState({ filteredPlaces: tmp });
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
                  // diveInDetails={this.diveInDetails}
                  diveInDetails={this.diveInDetails}
                />
              </Col>
              <Col xs={12} sm={9}>
                <PageHeader className="header">
                  Neighborhood
                  <small> a demo project</small>
                </PageHeader>
                <hr />
                {/* <Button onClick={this.testApi}>test the API</Button> */}
                <Well>
                  <MyMap
                    places={this.state.filteredPlaces}
                    setFocusOnMarker={this.setFocusOnMarker}
                    diveInDetails={this.diveInDetails}
                  />
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
