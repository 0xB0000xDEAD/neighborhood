import React from "react";

import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";

const Filter = props => {
  Filter.propTypes = {};
  return (
    <div>
      <form>
        <FormGroup
          controlId="formBasicText"
          // validationState={this.getValidationState()}
        >
          <ControlLabel>Filter the list</ControlLabel>
          <FormControl
            type="text"
            // value={"value"}
            placeholder="type 91 for example"
            onChange={props.search}
            bsSize={"large"}
          />
          <FormControl.Feedback />
          <HelpBlock>enter a Postcode</HelpBlock>
        </FormGroup>
      </form>
    </div>
  );
};
export default Filter;
