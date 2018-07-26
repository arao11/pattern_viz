import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ComparePage from './compare-page';

export class SelectFile extends Component {
  constructor(props) {
    super(props)
    this.state = {sourceButton: 'Select Source Dataset',
                  targetButton: 'Select Target Dataset',
                  hasSelectedFile: false,
                  fileData: {
                    projectSource: '',
                    datasetSource: '',
                    projectTarget: '',
                    datasetTarget: ''
                  }};

    this.modifySource = this.modifySource.bind(this);
    this.modifyTarget = this.modifyTarget.bind(this);
    this.clearFiles = this.clearFiles.bind(this);
  }

  modifySource(proj, datas, e) {
    let fileData = Object.assign({}, this.state.fileData);
    fileData.projectSource = proj;
    fileData.datasetSource = datas;
    this.setState({fileData});
    this.setState(prevState => ({
      sourceButton: `${proj}/${datas}`
    }));
  }

  modifyTarget(proj, datas, e) {
    let fileData = Object.assign({}, this.state.fileData);
    fileData.projectTarget = proj;
    fileData.datasetTarget = datas;
    this.setState({fileData});
    this.setState(prevState => ({
      targetButton: `${proj}/${datas}`
    }));
  }

  clearFiles() {
    this.setState(prevState => ({
      fileData: {
        projectSource: '',
        datasetSource: '',
        projectTarget: '',
        datasetTarget: ''
      },
      sourceButton: 'Select Source Dataset',
      targetButton: 'Select Target Dataset'
    }));
  }

  render() {
    const {
      list,
      dispatch
    } = this.props;

    const {
      sourceButton,
      targetButton,
      fileData
    } = this.state;

    const filesArray = Object.values(list);

    const filesSource = filesArray.map((item) =>
    <MenuItem
      onClick={(e) => this.modifySource(item.project, item.dataset, e)}>
      {item.dataset}
    </MenuItem>);

    const filesTarget = filesArray.map((item) =>
    <MenuItem
      onClick={(e) => this.modifyTarget(item.project, item.dataset, e)}>
      {item.dataset}
    </MenuItem>);

    if ((fileData.projectSource.length > 0) && (fileData.projectTarget.length > 0)) {
      console.log(fileData);
      return (
        <ComparePage
          data={fileData}
          dispatch={this.props.dispatch}
        />
      );
    }

    return (
      <div className = 'file-selection'>
        <ButtonToolbar>
          <DropdownButton title={sourceButton} id="dropdown-size-medium">
            {filesSource}
          </DropdownButton>
          <DropdownButton title={targetButton} id="dropdown-size-medium">
            {filesTarget}
          </DropdownButton>
          <Button bsStyle='primary'>
            Render
          </Button>
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
