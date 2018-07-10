import React, { Component } from 'react';
import Dropdown from './dropdown';
import PropTypes from 'prop-types';
import './compare-pageCSS.css';

import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
//import { LinkContainer } from 'react-router-bootstrap';

export class ComparePage extends Component {
  constructor() {
    super()
  }

  render() {

    const {
			project,
			filename,
			viewStateURI,
		} = this.props.params;

    const isViewingDataset = project && filename;

		const datasetTitle = `${project}/${filename}`;



    return (
      <div className="App">
        Target source
        
        <Dropdown />
          {isViewingDataset ?
            {datasetTitle} :
            <li>TestingNOTVIEWING</li>
          }
      </div>
    );
  }
}
