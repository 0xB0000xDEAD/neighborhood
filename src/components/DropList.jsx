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
  Panel,
  PanelGroup
} from "react-bootstrap";

import { Grid, Row, Col, Well } from "react-bootstrap";

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
    console.log(this.props);

    let button = this.props.places.map(el => {
      return (
        <Button
          key={el.id}
          bsSize="small"
          active={el.areWeHovering}
          onClick={e => this.handleClick(el.id, e)}
          onMouseOver={e => this.handleMouseOver(el.id, e)}
          block
        >
          {el.name}
        </Button>
      );
    });

    let Mypanel = this.props.places.map(el => {
      return (
        <Panel eventKey={el.id} key={el.id}>
          <Panel.Title toggle>
            <Button
              bsSize="small"
              active={el.areWeHovering}
              onClick={e => this.handleClick(el.id, e)}
              onMouseOver={e => this.handleMouseOver(el.id, e)}
              block
            >
              {el.name}
            </Button>
          </Panel.Title>
          <Panel.Body collapsible>
            <p>
              Obviously a solution using .Less is perfectly acceptable when
              using ASP.Net MVC, so you do not have to restrict answers to raw
              CSS. Recent developments mean adding Bootstrap.less to a project
              is now trivial via NuGet. In fact most plain CSS answers will
              suffer from being less maintainable that any solution that
              reproduces the minimal css from the original source.
            </p>
          </Panel.Body>
        </Panel>
      );
    });

    // return (
    //   <Panel>
    //     <Panel.Heading>
    //       <Panel.Title componentClass="h3">
    //         top 10 skate park in Los Angeles
    //       </Panel.Title>
    //     </Panel.Heading>
    //     <Panel.Body>
    //       <Grid>
    //         <Col sm={12} md={6}>
    //           <div>{button}</div>
    //         </Col>
    //       </Grid>
    //     </Panel.Body>
    //   </Panel>
    // );

    return (
      <PanelGroup accordion id="accordion-example">
        {Mypanel}
      </PanelGroup>
    );
  }
}

export default DropList;
