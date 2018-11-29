import React, { Component } from "react";
import { Grid, Row, Col, Button, Image } from "react-bootstrap";

import notFound from "../assets/images/notFound.png";

export default class Details2 extends Component {
  handleError = e => {
    e.target.src = notFound;
  };

  render() {
    return (
      this.props.place !== undefined && (
        <Grid>
          <Row>
            <Col sm={6} md={5} className="trick">
              <br />
              <Image
                src={this.props.place.photos}
                onError={e => {
                  this.handleError(e);
                }}
                responsive
                className="bw"
                alt="a skatepark photo"
              />
            </Col>
            <Col sm={6} md={3} className="trick">
              <h3>{this.props.place.name}</h3>
              {this.props.place.address !== undefined && (
                <div>
                  <h4>{this.props.place.address}</h4>
                  <Button
                    bsStyle="primary"
                    onClick={e => {
                      // TODO use maps navigation API
                    }}
                  >
                    Go
                  </Button>
                </div>
              )}
              <h4>{this.props.place.description}</h4>
              <h4>{this.props.place.url}</h4>
              <h4>{this.props.place.phone}</h4>
            </Col>
          </Row>
        </Grid>
      )
    );
  }
}
