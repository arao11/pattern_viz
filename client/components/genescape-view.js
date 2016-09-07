import React, { Component, PropTypes } from 'react';

import { GenescapeSidepanel } from './genescape-sidepanel';
import { Scatterplot } from './scatterplot';
import { FetchDatasetComponent } from './fetch-dataset';

import { SET_GENESCAPE_PROPS } from '../actions/actionTypes';

const GenescapeComponent = function (props) {
	const { dispatch, dataSet } = props;
	const { genescapeState } = dataSet;
	const color = dataSet.rowAttrs[genescapeState.colorAttr ? genescapeState.colorAttr : 0];
	const x = dataSet.rowAttrs[genescapeState.xCoordinate ? genescapeState.xCoordinate : 0];
	const y = dataSet.rowAttrs[genescapeState.yCoordinate ? genescapeState.yCoordinate : 0];
	return (
		<div className='view' >
			<GenescapeSidepanel
				genescapeState={genescapeState}
				dataSet={dataSet}
				dispatch={dispatch}
				/>
			<Scatterplot
				x={x}
				y={y}
				color={color}
				colorMode={genescapeState.colorMode}
				logScaleColor={false}
				logScaleX={false}
				logScaleY={false}
				style={{ margin: '20px' }}
				/>
		</div>
	);

};

GenescapeComponent.propTypes = {
	dataSet: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
};

class GenescapeStateInitialiser extends Component {

	componentWillMount() {
		const { dispatch, dataSet } = this.props;
		if (!dataSet.genescapeState) {
			// Initialise genescapeState for this dataset
			dispatch({
				type: SET_GENESCAPE_PROPS,
				datasetName: dataSet.dataset,
				genescapeState: {
					xCoordinate: '_tSNE1',
					yCoordinate: '_tSNE2',
					colorAttr: dataSet.rowAttrs[0],
					colorMode: 'Heatmap',
				},
			});
		}
	}

	render() {
		const { dispatch, dataSet } = this.props;
		return dataSet.genescapeState ? (
			<GenescapeComponent
				dispatch={dispatch}
				dataSet={dataSet}
				/>
		) : <div className='view'>Initialising Gene View Settings</div>;
	}
}

GenescapeStateInitialiser.propTypes = {
	dataSet: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
};

const GenescapeDatasetFetcher = function (props) {
	const { dispatch, data, params } = props;
	const { dataset, project } = params;
	const dataSet = data.dataSets[dataset];
	return (dataSet === undefined ?
		<FetchDatasetComponent
			dispatch={dispatch}
			dataSets={data.dataSets}
			dataset={dataset}
			project={project} />
		:
		<GenescapeStateInitialiser
			dataSet={dataSet}
			dispatch={dispatch} />
	);
};

GenescapeDatasetFetcher.propTypes = {
	// Passed down by react-router-redux
	params: PropTypes.object.isRequired,
	// Passed down by react-redux
	data: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
};

//connect GenescapeDatasetFetcher to store
import { connect } from 'react-redux';

// react-router-redux passes URL parameters
// through ownProps.params. See also:
// https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
const mapStateToProps = (state, ownProps) => {
	return {
		params: ownProps.params,
		data: state.data,
	};
};

export const GenescapeView = connect(mapStateToProps)(GenescapeDatasetFetcher);

