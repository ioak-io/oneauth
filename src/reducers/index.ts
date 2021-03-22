import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import UserReducer from './UserReducer';
import SpaceReducer from './SpaceReducer';
import AssetReducer from './AssetReducer';
import AppReducer from './AppReducer';
import PermittedSpaceReducer from './PermittedSpaceReducer';
import OaRoleReducer from './OaRoleReducer';
import OaUserReducer from './OaUserReducer';

export default combineReducers({
  authorization: AuthReducer,
  profile: ProfileReducer,
  user: UserReducer,
  space: SpaceReducer,
  asset: AssetReducer,
  app: AppReducer,
  oaUsers: OaUserReducer,
  oaRoles: OaRoleReducer,
  permittedSpace: PermittedSpaceReducer,
});
