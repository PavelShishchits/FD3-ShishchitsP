export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const REMOVE_CLIENT = 'REMOVE_CLIENT';

export const fetchDataSuccess = (clients) => {
  return {
    type: FETCH_DATA_SUCCESS,
    clients
  }
};

export const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    error
  }
};

export const removeClient = (id) => {
  return {
    type: REMOVE_CLIENT,
    id
  }
};

export const setVisabilityFilters = (filter) => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
};

export const VisabilityFiltes = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_UNACTiVE: 'SHOW_UNACTiVE',
};