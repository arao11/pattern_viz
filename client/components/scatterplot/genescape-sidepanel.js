import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ScatterPlotSidepanel } from './scatterplot-sidepanel';

export class GenescapeSidepanel extends PureComponent {
	render() {
		const { dispatch, dataset, className, style } = this.props;

		return (
			<ScatterPlotSidepanel
				dispatch={dispatch}
				dataset={dataset}
				axis={'row'}
				viewState={dataset.viewState.row}
				className={className}
				style={style}
			/>
		);
	}
}

GenescapeSidepanel.propTypes = {
	dataset: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
	className: PropTypes.string,
	style: PropTypes.object,
};