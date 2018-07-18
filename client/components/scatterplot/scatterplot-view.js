import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ScatterPlotMatrix } from 'components/scatterplot/scatterplot-matrix';
import { ScatterPlotSidepanel } from 'components/scatterplot/scatterplot-sidepanel';

import { Remount } from 'components/remount';

const viewStyle = {
	overflowX: 'auto',
	minHeight: 0,
};

const sidePanelStyle = {
	overflowX: 'auto',
	overFlowY: 'auto',
	minHeight: 0,
	width: '300px',
	margin: '10px',
};

const noSidePanelStyle = {
	overflowX: 'auto',
	overFlowY: 'auto',
	minHeight: 0,
	width: '0px',
	margin: '0px',
};

export class ScatterplotComponent extends Component {
	render() {
		const {
			dispatch,
			dataset,
			axis,
			disableSidePanel,
		} = this.props;
		const {
			ascendingIndices,
			scatterPlots,
		} = dataset.viewState[axis];
		const {
			selectedPlot,
			totalPlots,
			plotSettings,
		} = scatterPlots;
		const { attrs } = dataset[axis];

		return (
			<div className='view' style={viewStyle}>
				<ScatterPlotSidepanel
					dataset={dataset}
					dispatch={dispatch}
					axis={axis}
					viewState={dataset.viewState[axis]}
					style={disableSidePanel ? noSidePanelStyle: sidePanelStyle}
				/>
				<Remount watchedVal={totalPlots} >
					<ScatterPlotMatrix
						attrs={attrs}
						axis={axis}
						dataset={dataset}
						dispatch={dispatch}
						plotSettings={plotSettings}
						selectedPlot={selectedPlot}
						totalPlots={totalPlots}
						ascendingIndices={ascendingIndices}
					/>
				</Remount>
			</div>
		);
	}
}

ScatterplotComponent.propTypes = {
	axis: PropTypes.string.isRequired,
	dataset: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
	disableSidePanel: PropTypes.bool.isRequired,
};
