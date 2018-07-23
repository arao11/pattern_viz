import React, { Component } from 'react';
import Dropdown from './dropdown';
import PropTypes from 'prop-types';
import { LandscapeView } from '../scatterplot/landscape-view';

import './compare-pageCSS.css';

import {
  ButtonToolbar,
  DropdownButton,
  MenuItem,
  Grid,
  Row,
  Col,
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
    const paramsSource = {
      project: "test",
      filename: "L1_StriatumDorsal.loom",
      viewStateURI: "NrBEoXQGmAGHgEYq2kqi3IExagZjwBYI0R4j4A7AVwBs6UMnt5FZ5gBOADidRhcu_UvxTQ2osJBgUKUbEx5pO6AekwwceQlqgkycKAFYotBk2TxWGDjCIiY~ERMeS0lM_UbPgRIgDswtjGAQBsARhExtEYASHCiGFEQiaI~GH6XNgOrDkKRDz48AGlfNhhiDyK2AH4yElcSQXGxshBdQoZxtawxjyROYjDcYhNGGE8fXEhmu5AA"
    }

    const datasetsSource = "test/L1_StriatumDorsal.loom"

    const paramsTarget = {
      project: "test",
      filename: "L1_StriatumVentral.loom",
      viewStateURI: "NrBEoXQGmAGHgEYq2kqi3IExagZjwBYI0R4j4A7AVwBs6UMnt5FZ5gBOAVidRhcAbP1L8U0NmLCQYFClGxMAHGk7oB6TDBx5COqCTJwofWgybJ4rDBxhFRMfKMmOpaSlHONnwIkQB2LkUeAKEAjCIeKIwA7B5gxCEiLmCeRHwRFOwHVhzFImV8eADS5UUhRGUlbAD8ZCSuJIKedKggusVMnmtYHmUInMRh2MQmjCFlPtj47XcgA"
    }

    const datasetsTarget = "test/L1_StriatumVentral.loom"

    return (
      <div>
        <div className='graphs'>
          <LandscapeView
              dispatch={this.props.dispatch}
              params={paramsSource}
              datasets={datasetsSource}
              disableSidePanel={this.state.disableSourceSidePanel}
          />
        <div className='buttons'>
            <ButtonToolbar>
                <Button onClick={this.toggleSourceSidePanel}>
                  Show Source Side Panel
                </Button>
            </ButtonToolbar>
            <ButtonToolbar>
                <Button onClick={this.toggleTargetSidePanel}>
                  Show Target Side Panel
                </Button>
            </ButtonToolbar>
            <Dropdown />
          </div>
          <LandscapeView
              dispatch={this.props.dispatch}
              params={paramsTarget}
              datasets={datasetsTarget}
              disableSidePanel={this.state.disableTargetSidePanel}
          />
        </div>
      </div>
    );
  }
}

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
export const compareScatterPage = connect(mapStateToProps)(ComparePage);
