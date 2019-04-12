import { combineReducers } from 'redux-immutable';
import userReducer from '../users/redux/reducer';

const rootReducer = combineReducers({
  user: userReducer,
});
export default rootReducer;
