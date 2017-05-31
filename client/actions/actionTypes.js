const prod = process.env.NODE_ENV === 'production';

// dirty trick to replace strings with integers in production
if (prod) {
	var _REQUEST_PROJECTS_FETCH = 1;
	var _REQUEST_PROJECTS_FAILED = 2;
	var _RECEIVE_PROJECTS = 3;

	var _REQUEST_DATASET = 4;
	var _REQUEST_DATASET_FETCH = 5;
	var _REQUEST_DATASET_CACHED = 6;
	var _REQUEST_DATASET_FAILED = 7;
	var _RECEIVE_DATASET = 8;

	var _SEARCH_DATASETS = 9;
	var _SORT_DATASETS = 10;

	var _FILTER_METADATA = 11;
	var _SORT_ROW_METADATA = 12;
	var _SORT_COL_METADATA = 13;

	var _REQUEST_GENE_FETCH = 14;
	var _REQUEST_GENE_FAILED = 15;
	var _RECEIVE_GENE = 16;

	var _SET_VIEW_PROPS = 17;
} else {
	var _REQUEST_PROJECTS_FETCH = 'REQUEST_PROJECTS_FETCH';
	var _REQUEST_PROJECTS_FAILED = 'REQUEST_PROJECTS_FAILED';
	var _RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';

	var _REQUEST_DATASET = 'REQUEST_DATASET';
	var _REQUEST_DATASET_FETCH = 'REQUEST_DATASET_FETCH';
	var _REQUEST_DATASET_CACHED = 'REQUEST_DATASET_CACHED';
	var _REQUEST_DATASET_FAILED = 'REQUEST_DATASET_FAILED';
	var _RECEIVE_DATASET = 'RECEIVE_DATASET';

	var _SEARCH_DATASETS = 'SEARCH_DATASETS';
	var _SORT_DATASETS = 'SORT_DATASETS';

	var _FILTER_METADATA = 'FILTER_METADATA';
	var _SORT_ROW_METADATA = 'SORT_ROW_METADATA';
	var _SORT_COL_METADATA = 'SORT_COL_METADATA';

	var _REQUEST_GENE_FETCH = 'REQUEST_GENE_FETCH';
	var _REQUEST_GENE_FAILED = 'REQUEST_GENE_FAILED';
	var _RECEIVE_GENE = 'RECEIVE_GENE';

	var _SET_VIEW_PROPS = 'SET_VIEW_PROPS';
}

export const REQUEST_PROJECTS_FETCH = _REQUEST_PROJECTS_FETCH;
export const REQUEST_PROJECTS_FAILED = _REQUEST_PROJECTS_FAILED;
export const RECEIVE_PROJECTS = _RECEIVE_PROJECTS;

export const REQUEST_DATASET = _REQUEST_DATASET;
export const REQUEST_DATASET_FETCH = _REQUEST_DATASET_FETCH;
export const REQUEST_DATASET_CACHED = _REQUEST_DATASET_CACHED;
export const REQUEST_DATASET_FAILED = _REQUEST_DATASET_FAILED;
export const RECEIVE_DATASET = _RECEIVE_DATASET;

export const SEARCH_DATASETS = _SEARCH_DATASETS;
export const SORT_DATASETS = _SORT_DATASETS;

export const FILTER_METADATA = _FILTER_METADATA;
export const SORT_ROW_METADATA = _SORT_ROW_METADATA;
export const SORT_COL_METADATA = _SORT_COL_METADATA;

export const REQUEST_GENE_FETCH = _REQUEST_GENE_FETCH;
export const REQUEST_GENE_FAILED = _REQUEST_GENE_FAILED;
export const RECEIVE_GENE = _RECEIVE_GENE;

export const SET_VIEW_PROPS = _SET_VIEW_PROPS;