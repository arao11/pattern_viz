import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LandscapeView } from '../scatterplot/landscape-view';
import PatternSelector from './pattern-selector';
import {
  ButtonToolbar,
  Button,
  DropdownButton,
  MenuItem,
  ButtonGroup
} from 'react-bootstrap';

const graphStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const buttonStyle = {
  display: 'flex',
  flexDirection: 'column'
}

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
      dataSource,
      dataTarget,
      dispatch
    } = this.props;

    const paramsSource = {
      project: dataSource.project,
      filename: dataSource.dataset
    };

    const paramsTarget = {
      project: dataTarget.project,
      filename: dataTarget.dataset
    };

    const datasetsSource = `${dataSource.project}/${dataSource.dataset}`;

    const datasetsTarget = `${dataTarget.project}/${dataTarget.dataset}`;

    const patternsTemp = ['Pattern 1', 'Pattern 2', 'Pattern 3'];

    return (
      <div style={graphStyle}>
        <LandscapeView
            dispatch={dispatch}
            params={paramsSource}
            datasets={datasetsSource}
            disableSidePanel={this.state.disableSourceSidePanel}
        />
        <ButtonGroup vertical>
          <Button onClick={this.toggleSourceSidePanel}>
            Show Source Side Panel
          </Button>
          <Button onClick={this.toggleTargetSidePanel}>
            Show Target Side Panel
          </Button>
          <PatternSelector patterns={patternsTemp}/>
        </ButtonGroup>
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
	dataSource: PropTypes.object.isRequired,
  dataTarget: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};
