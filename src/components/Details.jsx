import React from "react";
import { Jumbotron, Button } from "react-bootstrap";

const Details = props => {
  
  return (
    props.place !== undefined && (
      <div >
        <Jumbotron>
          <h3>{props.place.name}</h3>
          <h4>{props.place.description}</h4>
          <h4>{props.place.url}</h4>

          <img src={props.place.photos} alt="" />

          <p>
            <Button bsStyle="primary">Call</Button>
          </p>
        </Jumbotron>
      </div>
    )
  );

  // return (
  //   <div>
  //     <p>jkkdjskj</p>
  //   </div>
  // );
};

export default Details;
