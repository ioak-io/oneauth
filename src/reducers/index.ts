import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import SpaceReducer from './SpaceReducer';
import OaRoleReducer from './OaRoleReducer';
import OaUserReducer from './OaUserReducer';

export default combineReducers({
  authorization: AuthReducer,
  profile: ProfileReducer,
  space: SpaceReducer,
  oaUsers: OaUserReducer,
  oaRoles: OaRoleReducer,
});
