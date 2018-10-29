import React, { Component } from "react";
import { Grid, Row, Col, Button, Image } from "react-bootstrap";

export default class Details2 extends Component {
  state = {
    vieport: null
  };
  handleViewport() {
    let w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    console.log(w);
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleViewport);
  }
  render() {
    // return (
    //   this.props.place !== undefined && (
    //     <Grid>
    //       <Row>
    //         <Col sm={5} className="trick">
    //           <br />
    //           <Image
    //             src={this.props.place.photos}
    //             responsive
    //             className="bw"
    //             alt="a skatepark photo"
    //           />
    //         </Col>
    //         <Col sm={3} className="trick">
    //           <h3>{this.props.place.name}</h3>
    //           <p>{this.props.place.address}</p>
    //           <h4>{this.props.place.description}</h4>
    //           <h4>{this.props.place.url}</h4>
    //           {this.props.place.phone !== undefined && (
    //             <h5>Call the {this.props.place.phone}</h5>
    //           )}
    //           <p>
    //             <Button bsStyle="primary">Call</Button>
    //           </p>
    //         </Col>
    //       </Row>
    //     </Grid>
    //   )
    // );
    return (
      this.props.place !== undefined && (
        <div>
          <div style={{ width: 50 + "%" }}>
            <Image
              src={this.props.place.photos}
              responsive
              className="bw"
              alt="a skatepark photo"
            />
          </div>
          <div style={{ width: 50 + "%" }}>
            <h3>{this.props.place.name}</h3>
            <p>{this.props.place.address}</p>
            <h4>{this.props.place.description}</h4>
            <h4>{this.props.place.url}</h4>
            {this.props.place.phone !== undefined && (
              <h5>Call the {this.props.place.phone}</h5>
            )}
            <p>
              <Button bsStyle="primary">Call</Button>
            </p>
          </div>
        </div>
      )
    );
  }
}
