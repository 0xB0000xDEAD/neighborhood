import React from "react";
import "../style/Aside.css";

import Filter from "./Filter";
import List from "./List";

import {} from "react-bootstrap";
const Aside = props => {
  return (
    <aside>
      <Filter places={props.places} search={props.search} />
      <List
        places={props.places}
        setFocusOnMarker={props.setFocusOnMarker}
        diveInDetails={props.diveInDetails}
      />
    </aside>
  );
};

export default Aside;
