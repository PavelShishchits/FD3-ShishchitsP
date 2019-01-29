import {FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, REMOVE_CLIENT} from '../actions/clientActions';

const initialState = {
  clients: [],
  error: null,
  isLoaded: false
};

const clientReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        clients: action.clients,
        isLoaded: true,
        error: null
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        clients: [],
        error: action.error
      };
    case REMOVE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter((client) => client.id !== action.id)
      };
    default:
      return state;
  }
};

export default clientReducers;