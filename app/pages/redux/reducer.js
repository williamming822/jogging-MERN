import { fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';
import * as CONSTANTS from './constants';

const initialState = fromJS({
  persistLoaded: false,
  loading: false,
  notification: {
    type: '',
    visible: false,
    heading: '',
    message: '',
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    //we have to deal with this action when rehydrate by redux-persist nm
    case REHYDRATE:
      return state.set('persistLoaded', true);
    case CONSTANTS.SET_API_LOADING:
      return state.set('loading', action.value);
    case CONSTANTS.SET_GLOBAL_NOTIFICATION:
      return state.set('notification', fromJS({
        type: action.messageType,
        visible: action.visible,
        heading: action.heading,
        message: action.message,
      }));
    default:
      return state;
  }
}

export default appReducer;
