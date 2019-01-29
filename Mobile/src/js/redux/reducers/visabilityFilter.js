import {VisabilityFiltes, SET_VISIBILITY_FILTER} from '../actions/clientActions';

const visabilityFilter = (state = VisabilityFiltes.SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default visabilityFilter;