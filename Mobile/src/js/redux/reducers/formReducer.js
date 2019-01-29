// import {editClient, EDIT_CLIENT} from '../actions/clientActions';
//
// const initialState = {
//   clients: [],
//   client: {},
//   formMode: 0
// };
//
// const formReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case EDIT_CLIENT:
//       return {
//         client: state.clients.find((client) => client.id === action.id),
//         formMode: 1
//       };
//     default:
//       return state;
//   }
// };
//
// export default formReducer;