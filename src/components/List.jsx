import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

class List extends Component {
  componentDidMount() {}

  handleClick = (id, e) => {
    // console.log(`the id of the element is: ${id}`);
    this.props.diveInDetails(id);
  };
  handleMouseOver = (id, e) => {
    // console.log(`the id of the element is: ${id}`);
    this.props.setFocusOnMarker(id, e);
  };
  render() {
    let listItems = this.props.places.reduce((store, el) => {
      if (el.location.postalCode !== undefined) {
        store.push(
          <ListGroupItem
            active={el.isSelected}
            key={el.id}
            header={el.name}
            onClick={e => this.handleClick(el.id, e)}
            onMouseOver={e => this.handleMouseOver(el.id, e)}
          >
            {el.location.formattedAddress}
          </ListGroupItem>
        );
      } 
      else {
        store.push(
          <ListGroupItem
            active={el.isSelected}
            key={el.id}
            header={el.name}
            onClick={e => this.handleClick(el.id, e)}
            onMouseOver={e => this.handleMouseOver(el.id, e)}
          >
            {el.location.formattedAddress}
            {/* <p style={{ backgroundColor: "#ef6f1a" }}>no Postcode avalaible</p> */}
          </ListGroupItem>
        );
      }
      return store;
    }, []);

    return (
      <nav>
        <ListGroup>{listItems}</ListGroup>
      </nav>
    );
  }
}

export default List;
