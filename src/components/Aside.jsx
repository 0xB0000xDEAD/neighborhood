import React from "react";
import Spinner from "./Spinner";
import Filter from "./Filter";
import List from "./List";

import {} from "react-bootstrap";
const Aside = props => {
  return (
    <aside>
      <Filter places={props.places} search={props.search} />
      {!props.dataLoaded && (
        <div>
          <span>loading...</span>
          <Spinner />
        </div>
      )}
      {props.dataLoaded && (
        <List
          places={props.places}
          setFocusOnMarker={props.setFocusOnMarker}
          diveInDetails={props.diveInDetails}
        />
      )}
    </aside>
  );
};

export default Aside;
