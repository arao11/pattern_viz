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
} from 'react-bootstrap';

//import { LinkContainer } from 'react-router-bootstrap';

export class ComparePage extends Component {
  constructor() {
    super()
  }
  render() {

    //const project = 'test';

    //const filename = 'L1_StriatumDorsal.loom';

    //const isViewingDataset = project && filename;

		//const datasetTitle = `${project}/${filename}`;

    const paramsSource = {
      project: "test",
      filename: "L1_StriatumDorsal.loom",
      viewStateURI: "NrBEoXQGmAGHgEYq2kqi3IExagZjwBYI0R4j4A7AVwBs6UMnt5FZ5gBOADidRhcu_UvxTQ2osJBgUKUbEx5pO6AekwwceQlqgkycKAFYotBk2TxWGDjCIiY~ERMeS0lM_UbPgRIgDswtjGAQBsARhExtEYASHCiGFEQiaI~GH6XNgOrDkKRDz48AGlfNhhiDyK2AH4yElcSQXGxshBdQoZxtawxjyROYjDcYhNGGE8fXEhmu5AA"
    }

    const datasetsSource =  {
      "test/L1_StriatumDorsal.loom": {}
    }

    const paramsTarget = {
      project: "test",
      filename: "L1_StriatumVentral.loom",
      viewStateURI: "NrBEoXQGmAGHgEYq2kqi3IExagZjwBYI0R4j4A7AVwBs6UMnt5FZ5gBOAVidRhcAbP1L8U0NmLCQYFClGxMAHGk7oB6TDBx5COqCTJwofWgybJ4rDBxhFRMfKMmOpaSlHONnwIkQB2LkUeAKEAjCIeKIwA7B5gxCEiLmCeRHwRFOwHVhzFImV8eADS5UUhRGUlbAD8ZCSuJIKedKggusVMnmtYHmUInMRh2MQmjCFlPtj47XcgA"
    }

    const datasetsTarget =  {
      "test/L1L1_StriatumVentral.loom": {}
    }

    return (
        <Grid>
          <Row>
            <Col>
              Source Dataset
            </Col>
            <br />
            <Col>
              Target Dataset
            </Col>
          </Row>
          <Row>
            <Col>
              <LandscapeView
                dispatch={this.props.dispatch}
        				params={paramsSource}
        				datasets={datasetsSource} />
            </Col>
            <Col>
              <Dropdown />
            </Col>

            <Col>
              <LandscapeView
                dispatch={this.props.dispatch}
        				params={paramsTarget}
        				datasets={datasetsTarget} />
            </Col>
          </Row>
        </Grid>
    );
  }
}
