import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import AuthReducer from './reducers/AuthReducer';
import RealmReducer from './reducers/RealmReducer';
import ProfileReducer from './reducers/ProfileReducer';
import RoleReducer from './reducers/RoleReducer';
import SpaceReducer from './reducers/SpaceReducer';
import UserReducer from './reducers/UserReducer';

const initialState = {};

const middleware = [thunk];

const store = configureStore(
  {
    reducer: {
      authorization: AuthReducer,
      profile: ProfileReducer,
      user: UserReducer,
      role: RoleReducer,
      realm: RealmReducer,
      space: SpaceReducer,
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
