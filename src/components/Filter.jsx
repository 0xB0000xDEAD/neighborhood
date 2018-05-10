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
    <div className="filter">
      <form>
        <FormGroup
          controlId="formBasicText"
          // validationState={this.getValidationState()}
        >
          <ControlLabel>this is a ControlLabel</ControlLabel>
          {/* <FormControl
            type="text"
            // value={this.state.value}
            placeholder="Enter text"
            // onChange={this.handleChange}
          /> */}
          <DebounceInput
            element="input"
            minLength={2}
            debounceTimeout={750}
            onChange={props.search}
            placeholder={"search for a Place"}
          />
          <FormControl.Feedback />
          <HelpBlock>this is a HelpBlock</HelpBlock>
        </FormGroup>
      </form>
    </div>
  );
};
export default Filter;
