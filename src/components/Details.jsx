import React from "react";
import { Jumbotron } from "react-bootstrap";

const Details = props => {
  // console.log(props);

  return (
    props.place !== undefined && (
      <div >
        <Jumbotron>
          <h3>{props.place.name}</h3>
          <h4>{props.place.location.address}</h4>
          <img src={props.place.photos} alt="" />

          {/* <p>
           <Button bsStyle="primary">Call</Button>
         </p> */}
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
