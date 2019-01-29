import {FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, REMOVE_CLIENT, EDIT_CLIENT} from '../actions/clientActions';

const initialState = {
  clientToEdit: {},
  clients: [],
  error: null,
  isLoaded: false,
  formMode: 0
};

const clientReducer = (state = initialState, action) => {
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
    case EDIT_CLIENT:
      return {
        ...state,
        clientToEdit: state.clients.find((client) => client.id === action.id),
        formMode: action.formMode
      };
    default:
      return state;
  }
};

export default clientReducer;