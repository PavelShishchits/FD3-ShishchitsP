import {combineReducers} from 'redux';
import clientReducer from './clientReducer'
import visabilityFilter from './visabilityFilter';
// import formReducer from './formReducer';

export default combineReducers({
  clients: clientReducer,
  visabilityFilter
  // formReducer
});
