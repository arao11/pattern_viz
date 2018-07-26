import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LandscapeView } from '../scatterplot/landscape-view';

import './compare-pageCSS.css';

import {
  ButtonToolbar,
  DropdownButton,
  MenuItem,
  Button,
} from 'react-bootstrap';

const graphStyle = {
  display: 'flex',
  flexDirection: 'row',
};

/* <ButtonToolbar>
  <Button onClick={this.toggleSidePanel}>
    Show Side Panel
  </Button>
</ButtonToolbar> */


export class ScatterPlotDataset extends Component {
  constructor(props) {
    super(props)
    this.state = {disableSidePanel: true,
                  hasSelectedFile: false,
                  datasets: '',
                  params: {}};

    this.toggleSidePanel = this.toggleSidePanel.bind(this);
    this.modifyFiles = this.modifyFiles.bind(this);

  }

  toggleSidePanel() {
    this.setState(prevState => ({
      disableSidePanel: !prevState.disableSidePanel
    }));
  }

  modifyFiles(proj, datas,  e) {
    this.setState(prevState => ({
      datasets: `${proj}/${datas}`,
      params: {
        project: proj,
        filename: datas,
        viewStateURI: ''
      },
      hasSelectedFile: true
    }));
  }

  render() {
    const filesArray = Object.values(this.props.list);

    const files = filesArray.map((item) =>
    <MenuItem
      onClick={(e) => this.modifyFiles(item.project, item.dataset, e)}>
      {item.dataset}
    </MenuItem>);

    if (this.state.hasSelectedFile) {
      return (
          <LandscapeView
            dispatch={this.props.dispatch}
            params={this.state.params}
            datasets={this.state.datasets}
            disableSidePanel={this.state.disableSidePanel}
          />
      );
    }

    return (
      <div className = 'file-selection'>
        <ButtonToolbar>
          <DropdownButton title="Select Source Dataset" id="dropdown-size-medium">
            {files}
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}

ScatterPlotDataset.propTypes = {
	// Passed down by react-router
	dispatch: PropTypes.func.isRequired
};


import { connect } from 'react-redux';

// react-router-redux passes URL parameters
// through ownProps.params. See also:
// https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
const mapStateToProps = (state) => {
	if (state.datasets.list) {
		const {
			list,
		} = state.datasets;
		return {
			list,
		};
	}
	return {};
};
export const ScatterDataset = connect(mapStateToProps)(ScatterPlotDataset);
