import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import UserReducer from './UserReducer';
import RealmReducer from './RealmReducer';
import AssetReducer from './AssetReducer';
import ClientReducer from './ClientReducer';
import PermittedRealmReducer from './PermittedRealmReducer';
import OaRoleReducer from './OaRoleReducer';
import OaUserReducer from './OaUserReducer';

const rootReducer = combineReducers({
  authorization: AuthReducer,
  profile: ProfileReducer,
  user: UserReducer,
  realm: RealmReducer,
  asset: AssetReducer,
  client: ClientReducer,
  oaUsers: OaUserReducer,
  oaRoles: OaRoleReducer,
  permittedRealm: PermittedRealmReducer,
});

export default rootReducer;
