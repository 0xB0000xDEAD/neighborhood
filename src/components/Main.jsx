import React, { Component } from "react";

import port from "../config";

// import "../style/Main.css";
import { PageHeader } from "react-bootstrap";
import { Grid, Row, Col, Well, Button } from "react-bootstrap";
import DebounceInput from "react-debounce-input";

import {
  Navbar,
  NavItem,
  NavDropdown,
  NavbarBrand,
  Nav,
  MenuItem,
  FormGroup,
  FormControl
} from "react-bootstrap";

import Aside from "./Aside";

import dummy from "../response_dump";
import MyMap from "./MyMap";
import Details from "./Details";
import DropList from "./DropList";
import focusPin from "../icons/baseline-place-24px_1.svg";
import defaultPin from "../icons/baseline-place-24px_2.svg";
import callAPI from "../utils/callApi";
import Modal from "./Modal";
import Autocomplete from "react-autocomplete";

class Main extends Component {
  state = {
    locations: dummy.response.groups[0].items, // import from dump
    places: [],
    filteredPlaces: [],
    // showDetails: false,
    placeInFocus: undefined, // place to show the details
    isModalShowed: false,
    dataLoaded: false
  };

  componentDidMount() {
    let temp = []; // to set as state when all the data is fetched

    let loadData = () => {
      //park in new york (fake API call)
      let parks = {
        url: `http://localhost:${port}/searchResponse`,

        method: "GET"
      };
      // (real API call)(real API call)
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
      // los ankeles skate park (real API call)
      let skatePark = {
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

      callAPI(parks).then(output => {
        let responseJ = JSON.parse(output);
        let places = responseJ.response.venues; // place array

        let imageProcess = Promise.all(
          places.map(el => {
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
          for (const el of places) {
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
        return el.name.toLowerCase() === query.toString().trim();
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
    this.setState({ isModalShowed: true });
  };
  closeModal = () => {
    this.setState({
      isModalShowed: false
    });
  };

  render() {
    // console.log(this.state);
    if (this.state.dataLoaded) {
      // return (
      //   <main>
      //     <Grid>
      //       <Row className="show-grid">
      //         <Col xs={12} sm={3}>
      //           <Aside
      //             places={this.state.filteredPlaces}
      //             search={this.search}
      //             setFocusOnMarker={this.setFocusOnMarker}
      //             diveInDetails={this.diveInDetails}
      //           />
      //         </Col>
      //         <Col xs={12} sm={9}>
      //           <PageHeader className="header">
      //             Neighborhood
      //             <small> a demo project</small>
      //           </PageHeader>
      //           <hr />
      //           {/* <Button onClick={this.testApi}>test the API</Button> */}
      //           <Well>
      //             <MyMap
      //               places={this.state.filteredPlaces}
      //               setFocusOnMarker={this.setFocusOnMarker}
      //               diveInDetails={this.diveInDetails}
      //             />
      //           </Well>
      //           <hr />
      //           <Details place={this.state.placeInFocus} />
      //         </Col>
      //       </Row>
      //     </Grid>
      //   </main>
      // );
      return (
        <main>
          <Grid>
            <Row className="show-grid">
              <PageHeader className="header">
                Neighborhood
                <small> a demo project</small>
              </PageHeader>
              <Navbar /* fixedTop={true} */>
                {/* <Navbar.Header> */}
                {/* <Navbar.Brand>
                    <a href="#home">Brand</a>
                    paperino
                  </Navbar.Brand> */}
                {/* <Navbar.Toggle /> */}
                {/* </Navbar.Header> */}
                {/* <Navbar.Collapse> */}
                <Navbar.Form /* pullLeft */>
                  <FormGroup>
                    {/* <FormControl type="text" placeholder="filter" /> */}
                    <DebounceInput
                      element={FormControl}
                      minLength={1}
                      debounceTimeout={750}
                      onChange={this.search}
                      placeholder={"search for a Place"}
                    />
                  </FormGroup>
                  {/* <Button type="submit">Submit</Button> */}
                </Navbar.Form>
                {/* </Navbar.Collapse> */}
              </Navbar>

              <Autocomplete
                getItemValue={el => el.label}
                // items={[
                //   { label: "apple" },
                //   { label: "banana" },
                //   { label: "pear" }
                // ]}
                items={this.state.filteredPlaces.map(el => {
                  return { label: el.name };
                })}
                renderItem={(item, isHighlighted) => (
                  <div
                    style={{
                      background: isHighlighted ? "lightgray" : "white"
                    }}
                  >
                    {item.label}
                  </div>
                )}
                value={"placeholder"}
                // onChange={e => (value = e.target.value)}
                // onSelect={val => (value = val)}
              />
              <DropList
                places={this.state.filteredPlaces}
                search={this.search}
                setFocusOnMarker={this.setFocusOnMarker}
                diveInDetails={this.diveInDetails}
              />
              {/* <Col xs={2} sm={3}>
                <Aside
                  places={this.state.filteredPlaces}
                  search={this.search}
                  setFocusOnMarker={this.setFocusOnMarker}
                  // diveInDetails={this.diveInDetails}
                  diveInDetails={this.diveInDetails}
                />
              </Col> */}
              <Col xs={12} sm={12}>
                <Modal
                  isModalShowed={this.state.isModalShowed}
                  closeModal={this.closeModal}
                  place={this.state.placeInFocus}
                />
                <div id="test">paperino</div>
                <MyMap
                  places={this.state.filteredPlaces}
                  setFocusOnMarker={this.setFocusOnMarker}
                  diveInDetails={this.diveInDetails}
                />

                {/* <hr />
                <Details place={this.state.placeInFocus} /> */}
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
