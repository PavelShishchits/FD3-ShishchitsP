import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  REMOVE_CLIENT,
  ON_EDIT_CLIENT,
  ON_ADD_CLIENT,
  FORM_CLOSE,
  EDIT_CLIENT,
  ADD_CLIENT,
} from '../actions/clientActions';
import * as mModules from '../../modules/mobile';

const initialState = {
  clientToEdit: {},
  clients: [],
  error: null,
  isLoaded: false,
  formMode: 0
};

const clientReducer = (state = initialState, action) => {
  console.log(action.type);
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
        clients: mModules.removeClient(state.clients, action.id),
        clientToEdit: null,
        formMode: 0
      };
    case EDIT_CLIENT:
      return {
        ...state,
        clients: mModules.editClient(state.clients, action.el),
        clientToEdit: null,
        formMode: 0
      };
    case ADD_CLIENT:
      return {
        ...state,
        clients: mModules.addClient(state.clients, action.el),
        clientToEdit: null,
        formMode: 0
      };
    case ON_EDIT_CLIENT:
      return {
        ...state,
        clientToEdit: state.clients.find((client) => client.id === action.id),
        formMode: action.formMode
      };
    case ON_ADD_CLIENT:
      return {
        ...state,
        clientToEdit: action.el,
        formMode: action.formMode
      };
    case FORM_CLOSE:
      return {
        ...state,
        clientToEdit: null,
        formMode: action.formMode
      };
    default:
      return state;
  }
};

export default clientReducer;