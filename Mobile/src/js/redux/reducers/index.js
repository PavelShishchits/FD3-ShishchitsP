import {combineReducers} from 'redux';
import clientReducer from './clientReducers'
import visabilityFilter from './visabilityFilter';

export default combineReducers({
  clients: clientReducer,
  visabilityFilter
});
