export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VisabilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_UNACTiVE: 'SHOW_UNACTiVE',
};

export const setVisabilityFilters = (filter) => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
};