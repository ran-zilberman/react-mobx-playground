import ActionTypes from '../constants/BoDomainServicesActionTypes'

const initialState = {};

export default function boDomainServicesPane(state = initialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case ActionTypes.SHOW_LOADER:
      newState.isLoading = true;
      break;

    case ActionTypes.CLOSE_LOADER:
      delete newState.isLoading;
      break;

    case ActionTypes.GOT_DATA_FROM_SERVER:
      newState.jsonTree = action.response;
      break;
  }
  return newState;
}


