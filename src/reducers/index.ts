import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import UserReducer from './UserReducer';
import SpaceReducer from './SpaceReducer';
import RoleReducer from './RoleReducer';
import UsersReducer from './UsersReducer';

export default combineReducers({
  authorization: AuthReducer,
  profile: ProfileReducer,
  user: UserReducer,
  space: SpaceReducer,
  adminUsers: UsersReducer,
  roles: RoleReducer,
});
