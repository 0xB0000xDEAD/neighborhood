import React from "react";
import { Grid, Row, Col, Button, Image } from "react-bootstrap";

let adjust = () => {
  let w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  console.log(w);
};
adjust();

const Details = props => {
  // return (
  //   props.place !== undefined && (
  //     <div>
  //       <h3>{props.place.name}</h3>
  //       <h4>{props.place.description}</h4>
  //       <h4>{props.place.url}</h4>
  //       <Image src={props.place.photos} responsive className="bw" alt="" />
  //       >;
  //       <p>
  //         <Button bsStyle="primary">Call</Button>
  //       </p>
  //     </div>
  //   )
  // );

  return (
    props.place !== undefined && (
      <Grid>
        <Row>
          <Col sm={5}>
            <br />
            <Image
              src={props.place.photos}
              responsive
              className="bw"
              alt="a skatepark photo"
            />
          </Col>
          <Col sm={3}>
            <h3>{props.place.name}</h3>
            <p>{props.place.address}</p>
            <h4>{props.place.description}</h4>
            <h4>{props.place.url}</h4>
            {props.place.phone !== undefined && (
              <h5>Call the {props.place.phone}</h5>
            )}
            <p>
              <Button bsStyle="primary">Call</Button>
            </p>
          </Col>
        </Row>
      </Grid>
    )
  );
};

export default Details;
