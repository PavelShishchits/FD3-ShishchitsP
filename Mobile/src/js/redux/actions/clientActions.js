export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const REMOVE_CLIENT = 'REMOVE_CLIENT';
export const ON_EDIT_CLIENT = 'ON_EDIT_CLIENT';
export const ON_ADD_CLIENT = 'ON_ADD_CLIENT';
export const FORM_CLOSE = 'FORM_CLOSE';
export const EDIT_CLIENT = 'EDIT_CLIENT';
export const ADD_CLIENT = 'ADD_CLIENT';

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

export const editClient = (el) => {
  return {
    type: EDIT_CLIENT,
    el
  }
};

export const addClient = (el) => {
  return {
    type: ADD_CLIENT,
    el
  }
};

export const onEditClient = (id, formMode) => {
  return {
    type: ON_EDIT_CLIENT,
    id,
    formMode
  }
};

export const onAddClient = (el, formMode) => {
  return {
    type: ON_ADD_CLIENT,
    el,
    formMode
  }
};

export const formClose = (formMode) => {
  return {
    type: FORM_CLOSE,
    formMode
  };
};