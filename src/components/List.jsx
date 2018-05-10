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
    // console.log(this.props);

    let listGroup = this.props.places.map(el => {
      return (
        <ListGroupItem
          key={el.id}
          header={el.name}
          onClick={e => this.handleClick(el.id, e)}
          onMouseOver={e => this.handleMouseOver(el.id, e)}
        >
          {el.name}
        </ListGroupItem>
      );
    });

    return (
      <nav>
        <ListGroup>{listGroup}</ListGroup>
      </nav>
    );
  }
}

export default List;
