import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ComparePage from './compare-page';
import update from 'immutability-helper';

export class SelectFile extends Component {
  constructor(props) {
    super(props)
    this.state = {sourceButton: 'Select Source Dataset',
                  targetButton: 'Select Target Dataset',
                  hasSelectedFile: false,
                  fileDataSource: {
                    project: null,
                    dataset: null
                  },
                  fileDataTarget: {
                    project: null,
                    dataset: null
                  }
                };
    this.modifySource = this.modifySource.bind(this);
    this.modifyTarget = this.modifyTarget.bind(this);
    this.clearFiles = this.clearFiles.bind(this);
    this.handleRender = this.handleRender.bind(this);
  }

  componentDidMount () {
    const persistState = localStorage.getItem('rootState');

    if (persistState) {
      try {
        this.setState(JSON.parse(persistState));
      } catch (e) {
      }
    }
  }

  componentWillUnmount() {
    localStorage.setItem('rootState', JSON.stringify(this.state));
  }

  modifySource(proj, datas) {
    this.setState({
      fileDataSource: update(this.state.fileDataSource, {
        project: {$set: proj},
        dataset: {$set: datas}
      }),
      sourceButton: `${proj}/${datas}`
    });

  }

  modifyTarget(proj, datas) {
    this.setState({
      fileDataTarget: update(this.state.fileDataTarget, {
        project: {$set: proj},
        dataset: {$set: datas}
      }),
      targetButton: `${proj}/${datas}`
    });

  }

  clearFiles() {
    this.modifySource(null, null);
    this.modifyTarget(null, null);
  }

  handleRender() {
    if ((this.state.fileDataSource.project) && (this.state.fileDataTarget.project)) {
      this.setState(prevState => ({
        hasSelectedFile: true
      }));
    }
  }

  render() {
    const {
      list,
      dispatch
    } = this.props;

    const {
      sourceButton,
      targetButton,
      hasSelectedFile,
      fileDataSource,
      fileDataTarget,
      disableButton
    } = this.state;

    const filesArray = Object.values(list);

    const filesSource = filesArray.map((item) =>
    <MenuItem
      onClick={() => this.modifySource(item.project, item.dataset)}>
      {item.dataset}
    </MenuItem>);

    const filesTarget = filesArray.map((item) =>
    <MenuItem
      onClick={() => this.modifyTarget(item.project, item.dataset)}>
      {item.dataset}
    </MenuItem>);

    if (hasSelectedFile) {
      return (
        <ComparePage
          dataSource={fileDataSource}
          dataTarget={fileDataTarget}
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
          <Button
            bsStyle='primary'
            disabled={false}
            onClick={this.handleRender}>
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
