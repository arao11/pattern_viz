import React, { Component } from 'react';
import { LandscapeView } from './scatterplot/landscape-view';


import './DropdownCSS.css';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';



class Dropdown extends Component {
  render() {
      return (
        <div className = 'Dropdown'>
          <ButtonToolbar>
    <DropdownButton title="Default button" id="dropdown-size-medium">
      <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3">Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
    </DropdownButton>
  </ButtonToolbar>

        </div>
      );
  }
}

export default Dropdown;
