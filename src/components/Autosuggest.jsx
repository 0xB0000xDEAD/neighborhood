import React, { Component } from "react";

import Autosuggest from "react-autosuggest";

export default class Test extends React.Component {
  // Autosuggest is a controlled component.
  // This means that you need to provide an input value
  // and an onChange handler that updates this value (see below).
  // Suggestions also need to be provided to the Autosuggest,
  // and they are initially empty because the Autosuggest is closed.
  state = {
    value: "",
    suggestions: []
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    // const inputValue = value.trim().toLowerCase();
    const inputValue = value;

    const inputLength = inputValue.length;

    /*   return inputLength === 0
      ? []
      : this.props.places.filter(
          place => place.name.toLowerCase().slice(0, inputLength) === inputValue
        ); */

    /* this.props.places.forEach(element => {
      console.log(element.location);
    }); */

    return inputLength === 0
      ? []
      : this.props.places.filter(place => {
          console.log(place.name, " --->",  place.location.postalCode);
          return place.location.postalCode !== undefined
            ? place.location.postalCode.slice(0, inputLength) === value
            : true;
        });
  };
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.name;

  // Use your imagination to render suggestions.
  // renderSuggestion = suggestion => <div>{suggestion.name}</div>;
  renderSuggestion = suggestion => <span>{suggestion.name}</span>;

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state; //es6 destructuring ???

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Type a Postcode to filter",
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
