import React, { Component } from "react";
import { PageHeader, Grid, Row, Col } from "react-bootstrap";

import { config } from "../config";
import endpoints from "../utils/endpoint";
import notFound from "../assets/images/notFound.png";

import Aside from "./Aside";
import MyMap from "./MyMap";
import Details from "./Details";
import focusPin from "../icons/baseline-place-24px_1.svg";
import clickedPin from "../icons/baseline-place-24px_3.svg";
import defaultPin from "../icons/baseline-place-24px_2.svg";
import callAPI from "../utils/callApi";

class Main extends Component {
  state = {
    places: [],
    filteredPlaces: [],
    placeInFocus: undefined,
    dataLoaded: false
  };
  loadData = () => {
    let temp = []; //When  the data is fetched goes here

    callAPI(endpoints.search)
      .then(output => {
        let responseJ = JSON.parse(output);
        let places = responseJ.response.venues; // place array

        //get images from api
        let imageProcess = Promise.all(
          places.map(el => {
            return config.callForReal
              ? callAPI(endpoints.photo(el.id))
                  .then(function(output) {
                    let response = JSON.parse(output);

                    // console.log(`${response.response.photos.items[0].prefix}`);
                    // console.log(`${response.response.photos.items[0].suffix}`);

                    return `${
                      response.response.photos.items[0].prefix
                    }500x300${response.response.photos.items[0].suffix}`;
                  })
                  .catch(err => {
                    console.log(
                      "An error occured, image source can't be retrieved"
                    );
                    console.error(err);
                    return notFound;
                  })
              : callAPI(endpoints.photo(el.id))
                  .then(response => {
                    return `https://unsplash.it/500/300/?image=${Math.floor(
                      Math.random() * 100 + 1
                    )}`;
                  })
                  .catch(err => {
                    console.log(
                      "An error occured, image source can't be retrieved"
                    );
                    console.error(err);
                    return notFound;
                  });
          })
        );

        imageProcess.then(array => {
          let count = 0;
          for (const el of places) {
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
              photos: array[count]
            };
            count++;
            // console.log(tmp.photos);
            temp.push(tmp);
          }
          //put the places in the localStorage
          localStorage.setItem("data", JSON.stringify(temp));

          this.setState({ places: temp });
          this.setState({ filteredPlaces: temp });
          this.setState({ dataLoaded: true });
        });
      })
      .catch(err => {
        console.log("An error occured, places can't be retrieved");
        console.error(err);
        this.setState({ dataLoaded: false });
      });
  };
  useData = () => {
    let data = JSON.parse(localStorage.getItem("data"));
    // console.log(data);

    this.setState({ places: data });
    this.setState({ filteredPlaces: data });
    this.setState({ dataLoaded: true });
  };

  componentDidMount() {
    if (localStorage.getItem("data") === null) {
      // console.log("store places in localStorage");
      this.loadData();
    } else {
      // console.log("places are in localStorage");
      this.useData();
    }
  }

  filterPlaces = event => {
    let query = event.target.value;
    // console.log(`query is ${query}`);
    if (query) {
      let results = this.state.places.filter(el => {
        // console.log(el.name, " --->", el.location.postalCode);
        return el.location.postalCode !== undefined
          ? el.location.postalCode.slice(0, query.length) === query
          : false;
      });

      if (results.length > 0) {
        this.setState({ filteredPlaces: results });
        // console.log(results);
      } else {
        this.setState({ filteredPlaces: [] });
      }
    } else {
      this.setState({ filteredPlaces: this.state.places });
    }
  };
  setFocusOnMarker = (id, event) => {
    let tmp = this.state.filteredPlaces.reduce((store, el) => {
      if (el.icon === clickedPin) {
        store.push(el);
      } else {
        if (el.id === id) {
          el.icon = focusPin;
        } else {
          el.icon = defaultPin;
        }
        store.push(el);
      }
      return store;
    }, []);
    this.setState({ filteredPlaces: tmp });
  };

  diveInDetails = (id, event) => {
    let clickedElement;
    let tmp = this.state.filteredPlaces.reduce((store, el) => {
      if (el.id === id) {
        clickedElement = el;
        clickedElement.icon = clickedPin;
        clickedElement.isSelected = true;
        // api call to retrive details for the place in focus
        callAPI(endpoints.detail(id))
          .then(response => {
            let parsed = JSON.parse(response);
            clickedElement.description = parsed.response.venue.description;
            clickedElement.address =
              parsed.response.venue.location.formattedAddress;
            clickedElement.phone = parsed.response.venue.contact.phone;
            this.setState({ placeInFocus: clickedElement });
          })
          .catch(err => {
            console.log("An error occured, details can't be retrieved");
            console.error(err);
            clickedElement.description = "Can't retrieve the details. Please check the console";

            this.setState({ placeInFocus: clickedElement });
          });
      } else {
        el.isSelected = false;
        el.icon = defaultPin;
      }
      store.push(el);
      return store;
    }, []);
    this.setState({ filteredPlaces: tmp });
  };

  render() {
    return (
      <main>
        <Grid>
          <Row>
            <PageHeader>
              Neighborhood
              <small> a demo project</small>
            </PageHeader>
          </Row>

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
                {!this.state.dataLoaded && (
                  <p>Data can't be retrieved. Please check the console log.</p>
                )}
              </Row>
              <Row>
                <MyMap
                  places={this.state.filteredPlaces}
                  setFocusOnMarker={this.setFocusOnMarker}
                  diveInDetails={this.diveInDetails}
                  placeInFocus={this.state.placeInFocus}
                  dataLoaded={this.state.dataLoaded}
                />
              </Row>
              <Row>
                <Details place={this.state.placeInFocus} />
              </Row>
            </Col>
          </Row>
          <Row>
            <footer>
              <br />
              <p>
                All the data is provided through{" "}
                <a
                  href="https://developer.foursquare.com/places-api"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Foursquare API!
                </a>
              </p>
            </footer>
          </Row>
        </Grid>
      </main>
    );
  }
}

export default Main;
