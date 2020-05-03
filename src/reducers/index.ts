import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import SpaceReducer from './SpaceReducer';
import OaRoleReducer from './OaRoleReducer';
import OaUserReducer from './OaUserReducer';
import AppReducer from './AppReducer';
import AppSpaceReducer from './AppSpaceReducer';

export default combineReducers({
  authorization: AuthReducer,
  profile: ProfileReducer,
  space: SpaceReducer,
  app: AppReducer,
  oaUsers: OaUserReducer,
  oaRoles: OaRoleReducer,
  appSpace: AppSpaceReducer,
});
