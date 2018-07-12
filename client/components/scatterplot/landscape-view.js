import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ScatterplotComponent } from 'components/scatterplot/scatterplot-view';

import { ViewInitialiser } from 'components/view-initialiser';

class LandscapeComponent extends Component {

	//console.log(this.props.dataset);
	render() {
		return (
			<ScatterplotComponent
				axis='col'
				dataset={this.props.dataset}
				dispatch={this.props.dispatch} />
		);
	}
}

LandscapeComponent.propTypes = {
	dataset: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
};

export class LandscapeViewInitialiser extends Component {
	render() {
		console.log('props');
		return (
			<ViewInitialiser
				View={LandscapeComponent}
				dispatch={this.props.dispatch}
				params={this.props.params}
				datasets={this.props.datasets} />
		);
	}
}

LandscapeViewInitialiser.propTypes = {
	params: PropTypes.object.isRequired,
	datasets: PropTypes.object,
	dispatch: PropTypes.func.isRequired,
};

import { connect } from 'react-redux';

// react-router-redux passes URL parameters
// through ownProps.params. See also:
// https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
const mapStateToProps = (state, ownProps) => {
	return {
		params: ownProps.params,
		datasets: state.datasets.list,
	};
};

export const LandscapeView = connect(mapStateToProps)(LandscapeViewInitialiser);
