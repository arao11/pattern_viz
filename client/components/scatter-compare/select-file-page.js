import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';


export class SelectFile extends Component {
  constructor(props) {
    super(props)
    this.state = {datasetsSource: '',
                  datasetsTarget: ''};

    this.modifyFiles = this.modifyFiles.bind(this);
  }

  modifyFiles(proj, datas, type,  e) {
    if (type == 'source') {
      datasetsSource: `${proj}/${datas}`
    } else if (type == 'target') {
      datasetsTarget: `${proj}/${datas}`
    }
  }

  render() {
    const filesArray = Object.values(this.props.list);

    console.log(filesArray);

    const files = filesArray.map((item) =>
    <MenuItem
      onClick={(e) => this.modifyFiles(item.project, item.dataset, 'source', e)}>
      {item.dataset}
    </MenuItem>);

    const paramsSource = {
      project: "test",
      filename: "L1_StriatumDorsal.loom",
      viewStateURI: "NrBEoXQGmAGHgEYq2kqi3IExagZjwBYI0R4j4A7AVwBs6UMnt5FZ5gBOADidRhcu_UvxTQ2osJBgUKUbEx5pO6AekwwceQlqgkycKAFYotBk2TxWGDjCIiY~ERMeS0lM_UbPgRIgDswtjGAQBsARhExtEYASHCiGFEQiaI~GH6XNgOrDkKRDz48AGlfNhhiDyK2AH4yElcSQXGxshBdQoZxtawxjyROYjDcYhNGGE8fXEhmu5AA"
    }

    const paramsTarget = {
      project: "test",
      filename: "L1_StriatumVentral.loom",
      viewStateURI: "NrBEoXQGmAGHgEYq2kqi3IExagZjwBYI0R4j4A7AVwBs6UMnt5FZ5gBOAVidRhcAbP1L8U0NmLCQYFClGxMAHGk7oB6TDBx5COqCTJwofWgybJ4rDBxhFRMfKMmOpaSlHONnwIkQB2LkUeAKEAjCIeKIwA7B5gxCEiLmCeRHwRFOwHVhzFImV8eADS5UUhRGUlbAD8ZCSuJIKedKggusVMnmtYHmUInMRh2MQmjCFlPtj47XcgA"
    }

    return (
      <div className = 'Dropdown'>
        <ButtonToolbar>
          <DropdownButton title="Select Source Dataset" id="dropdown-size-medium">
            {files}
          </DropdownButton>
        </ButtonToolbar>

        <ButtonToolbar>
          <DropdownButton title="Select Target Dataset" id="dropdown-size-medium">
            {files}
          </DropdownButton>
        </ButtonToolbar>
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
export const SelectFilePage = connect(mapStateToProps)(SelectFile);
