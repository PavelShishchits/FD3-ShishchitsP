import {combineReducers} from 'redux';
import clientReducer from './clientReducers'

export default combineReducers({
  clients: clientReducer
});
