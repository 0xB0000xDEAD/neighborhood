import React from "react";
import PropTypes from "prop-types";
import { DebounceInput } from "react-debounce-input";
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
          {/* <DebounceInput
            element="input"
            minLength={2}
            debounceTimeout={750}
            onChange={props.search}
            placeholder={"search for a Place"}
          /> */}
          <FormControl.Feedback />
          <HelpBlock>enter a Postcode</HelpBlock>
        </FormGroup>
      </form>
    </div>
  );
};
export default Filter;
