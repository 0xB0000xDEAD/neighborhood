import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  Navbar,
  NavItem,
  NavDropdown,
  NavbarBrand,
  Nav,
  MenuItem,
  Button,
  ButtonGroup,
  Panel
} from "react-bootstrap";

class DropList extends Component {
  componentDidMount() {}

  handleClick = (id, e) => {
    // console.log(`the id of the element is: ${id}`);
    this.props.diveInDetails(id);
  };
  handleMouseOver = (id, e) => {
    // console.log(`the id of the element is: ${id}`);
    this.props.setFocusOnMarker(id, e);
    // console.log(e);
  };
  render() {
    // console.log(this.props);

    let button = this.props.places.map(el => {
      return (
        <Button
          key={el.id}
          bsSize="small"
          active={el.areWeHovering}
          bsClass="pippo"
          onClick={e => this.handleClick(el.id, e)}
          onMouseOver={e => this.handleMouseOver(el.id, e)}
        >
          {el.name}
        </Button>
      );
    });

    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">
            top 10 skate park in Los Angeles
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div>{button}</div>
        </Panel.Body>
      </Panel>
    );
  }
}

export default DropList;
