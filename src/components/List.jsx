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
    // e.target.value.setAttribute("class", "listElementHover")
    // console.log(e);
  };
  render() {
    let listGroup = this.props.places.map(el => {
      return (
        <ListGroupItem
          active={el.areWeHovering}
          key={el.id}
          header={el.name}
          onClick={e => this.handleClick(el.id, e)}
          onMouseOver={e => this.handleMouseOver(el.id, e)}
        >
          {el.location.formattedAddress}
        </ListGroupItem>
      );
    });
    let noInfo = this.props.places.filter(el => {
      return el.location.postalCode === undefined;
    });

    return (
      <nav>
        <ListGroup>{listGroup}</ListGroup>
        <span> no POstalCode</span>
        <ListGroup>
          {noInfo.map(el => {
            return (
              <ListGroupItem
                active={el.areWeHovering}
                key={el.id}
                header={el.name}
                onClick={e => this.handleClick(el.id, e)}
                onMouseOver={e => this.handleMouseOver(el.id, e)}
              >
                {el.location.formattedAddress}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </nav>
    );
  }
}

export default List;
