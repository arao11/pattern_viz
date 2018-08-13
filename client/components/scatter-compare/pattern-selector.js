import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';



class PatternSelector extends Component {
  render() {
      return (
        <DropdownButton title="Select Pattern" id="dropdown-size-medium">
          <MenuItem eventKey="1">{this.props.patterns[0]}</MenuItem>
          <MenuItem eventKey="2">{this.props.patterns[1]}</MenuItem>
          <MenuItem eventKey="3">{this.props.patterns[2]}</MenuItem>
        </DropdownButton>
      );
  }
}

export default PatternSelector;

PatternSelector.propTypes = {
  patterns: PropTypes.array.isRequired
};
