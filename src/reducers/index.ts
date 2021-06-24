import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import UserReducer from './UserReducer';
import RealmReducer from './RealmReducer';
import AssetReducer from './AssetReducer';
import AppReducer from './AppReducer';
import PermittedRealmReducer from './PermittedRealmReducer';
import OaRoleReducer from './OaRoleReducer';
import OaUserReducer from './OaUserReducer';

export default combineReducers({
  authorization: AuthReducer,
  profile: ProfileReducer,
  user: UserReducer,
  realm: RealmReducer,
  asset: AssetReducer,
  app: AppReducer,
  oaUsers: OaUserReducer,
  oaRoles: OaRoleReducer,
  permittedRealm: PermittedRealmReducer,
});
