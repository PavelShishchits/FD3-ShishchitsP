import {VisabilityFilters, SET_VISIBILITY_FILTER} from '../actions/filterActions';

const visabilityFilter = (state = VisabilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default visabilityFilter;