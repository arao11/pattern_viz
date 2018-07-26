import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScatterDataset from './scatter-dataset';
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

export class ComparePage extends Component {
  constructor(props) {
    super(props)
    this.state = {disableSourceSidePanel: true,
                  disableTargetSidePanel: true};

    this.toggleSourceSidePanel = this.toggleSourceSidePanel.bind(this);
    this.toggleTargetSidePanel = this.toggleTargetSidePanel.bind(this);
  }

  toggleSourceSidePanel() {
    this.setState(prevState => ({
      disableSourceSidePanel: !prevState.disableSourceSidePanel
    }));
  }

  toggleTargetSidePanel() {
    this.setState(prevState => ({
      disableTargetSidePanel: !prevState.disableTargetSidePanel
    }));
  }
  render() {
    const {
      data,
      dispatch
    } = this.props;

    const paramsSource = {
      project: data.projectSource,
      filename: data.datasetSource
    };

    const paramsTarget = {
      project: data.projectTarget,
      filename: data.datasetTarget
    };

    const datasetsSource = `${data.projectSource}/${data.datasetSource}`;

    const datasetsTarget = `${data.projectTarget}/${data.projectTarget}`;

    return (
        <div className='graphs'>
          <LandscapeView
              dispatch={dispatch}
              params={paramsSource}
              datasets={datasetsSource}
              disableSidePanel={this.state.disableSourceSidePanel}
          />
          <ButtonToolbar className='buttons'>
            <Button onClick={this.toggleSourceSidePanel}>
              Show Source Side Panel
            </Button>
            <Button onClick={this.toggleTargetSidePanel}>
              Show Target Side Panel
            </Button>
          </ButtonToolbar>
          <LandscapeView
              dispatch={dispatch}
              params={paramsTarget}
              datasets={datasetsTarget}
              disableSidePanel={this.state.disableTargetSidePanel}
          />
        </div>
    );
  }
}

export default ComparePage;

ComparePage.propTypes = {
	// Passed down by react-router
	data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
