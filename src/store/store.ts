import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import AuthReducer from './reducers/AuthReducer';
import ProfileReducer from './reducers/ProfileReducer';
import UserReducer from './reducers/UserReducer';
import RealmReducer from './reducers/RealmReducer';
import AssetReducer from './reducers/AssetReducer';
import ClientReducer from './reducers/ClientReducer';
import PermittedRealmReducer from './reducers/PermittedRealmReducer';
import OaRoleReducer from './reducers/OaRoleReducer';
import OaUserReducer from './reducers/OaUserReducer';

const initialState = {};

const middleware = [thunk];

const store = configureStore(
  {
    reducer: {
      authorization: AuthReducer,
      profile: ProfileReducer,
      user: UserReducer,
      realm: RealmReducer,
      asset: AssetReducer,
      client: ClientReducer,
      oaUsers: OaUserReducer,
      oaRoles: OaRoleReducer,
      permittedRealm: PermittedRealmReducer,
    }
  }
);
// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleware) // ,
//     // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

export default store;
