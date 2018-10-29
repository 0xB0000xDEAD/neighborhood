import React, { Component } from "react";
import { PageHeader, Grid, Row, Col } from "react-bootstrap";

import * as endpoints from "../utils/endpoint";

import Aside from "./Aside";
import MyMap from "./MyMap";
import Details from "./Details";
import Details2 from "./Details2"
import focusPin from "../icons/baseline-place-24px_1.svg";
import defaultPin from "../icons/baseline-place-24px_2.svg";
import callAPI from "../utils/callApi";
// import Modal from "./Modal";

class Main extends Component {
  state = {
    places: [],
    filteredPlaces: [],
    // showDetails: false,
    placeInFocus: undefined, // place to show the details
    isModalShowed: false,
    dataLoaded: false
  };
  loadData = () => {
    let temp = []; // to set as state when all the data is fetched

    // alternative

    // fetch("http://localhost:3004/searchResponse").then(function(data) {
    //   console.log(data.json());
    // });
    
    callAPI(endpoints.apiEndpoint2.search)
      .then(output => {
        let responseJ = JSON.parse(output);
        let places = responseJ.response.venues; // place array

        let imageProcess = Promise.all(
          places.map(el => {
            return callAPI(endpoints.apiEndpoint2.photo).then(function(output) {
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
      })
      .catch(err => {
        // console.log("something went south :_(");
        // console.log(err);
        this.setState({ dataLoaded: false });
      });
  };

  componentDidMount() {
    this.loadData();
    
  }

  filterPlaces = event => {
    let query = event.target.value;
    console.log(`query is ${query}`);
    if (query) {
      let results = this.state.places.filter(el => {
        // console.log(el.name, " --->", el.location.postalCode);
        console.log(query.inputLength);

        return el.location.postalCode !== undefined
          ? el.location.postalCode.slice(0, query.length) === query
          : false;
      });
      if (results.length > 0) {
        this.setState({ filteredPlaces: results });
        console.log(results);
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

  diveInDetails = (id, event) => {
    let focusTarget = this.state.filteredPlaces.find(el => {
      return el.id === id;
    });
    callAPI(endpoints.apiEndpoint2.detail(id)).then(response => {
      let parsed = JSON.parse(response);
      focusTarget.description = parsed.response.venue.description;
      focusTarget.address = parsed.response.venue.location.formattedAddress;
      focusTarget.phone = parsed.response.venue.contact.phone;
      this.setState({ placeInFocus: focusTarget });
    });
  };
  closeModal = () => {
    this.setState({
      isModalShowed: false
    });
  };

  render() {
    return (
      <main>
        <Grid>
          <Row>
            <PageHeader /* className="header" */>
              Neighborhood
              <small> a demo project</small>
            </PageHeader>
          </Row>
          {/* <Row>
              <Autosuggest places={this.state.places} />
            </Row> */}
          <Row>
            <Col sm={12} md={4}>
              <Aside
                places={this.state.filteredPlaces}
                search={this.filterPlaces}
                setFocusOnMarker={this.setFocusOnMarker}
                diveInDetails={this.diveInDetails}
                dataLoaded={this.state.dataLoaded}
              />
            </Col>
            <Col sm={12} md={8}>
              <Row>
                <MyMap
                  places={this.state.filteredPlaces}
                  setFocusOnMarker={this.setFocusOnMarker}
                  diveInDetails={this.diveInDetails}
                  dataLoaded={this.state.dataLoaded}
                />
              </Row>
              <Row>
                {/* <Details place={this.state.placeInFocus} /> */}
                <Details2 place={this.state.placeInFocus} />

              </Row>
            </Col>

            {/* <Col xs={12} sm={6} mdHidden={true}>
                <DropList
                  places={this.state.filteredPlaces}
                  search={this.search}
                  setFocusOnMarker={this.setFocusOnMarker}
                  diveInDetails={this.diveInDetails}
                />
              </Col> */}
            {/* <Col xs={12} sm={12} md={8} mdOffset={4}>
              <Modal
                isModalShowed={this.state.isModalShowed}
                closeModal={this.closeModal}
                place={this.state.placeInFocus}
              />

            </Col> */}
            {/* <hr />
                <Details place={this.state.placeInFocus} /> */}
          </Row>
        </Grid>
      </main>
    );
  }
}

export default Main;
