export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchDataSuccess = (clients) => {
  return {
    type: FETCH_DATA_SUCCESS,
    clients: clients
  }
};

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  error: error
});