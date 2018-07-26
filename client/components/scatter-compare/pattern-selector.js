import React, { Component } from 'react';
import './DropdownCSS.css';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';



class PatternSelector extends Component {
  render() {
      return (
        <div className = 'Dropdown'>
          <ButtonToolbar>
            <DropdownButton title="Select Pattern" id="dropdown-size-medium">
              <MenuItem eventKey="1">Pattern 1</MenuItem>
              <MenuItem eventKey="2">Pattern 2</MenuItem>
              <MenuItem eventKey="3">Pattern 3</MenuItem>
            </DropdownButton>
          </ButtonToolbar>
        </div>
      );
  }
}

export default PatternSelector;
