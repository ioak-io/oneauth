import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import AuthReducer from './reducers/AuthReducer';
import CategoryReducer from './reducers/CategoryReducer';
import CompanyReducer from './reducers/CompanyReducer';
import ExpenseReducer from './reducers/ExpenseReducer';
import FilterExpenseReducer from './reducers/FilterExpenseReducer';
import IncomeCategoryReducer from './reducers/IncomeCategoryReducer';
import IncomeReducer from './reducers/IncomeReducer';
import LabelReducer from './reducers/LabelReducer';
import MetadataDefinitionReducer from './reducers/MetadataDefinitionReducer';
import MetadataValueReducer from './reducers/MetadataValueReducer';
import NoteReducer from './reducers/NoteReducer';
import ProfileReducer from './reducers/ProfileReducer';
import ReceiptReducer from './reducers/ReceiptReducer';
import RoleReducer from './reducers/RoleReducer';
import SpaceReducer from './reducers/SpaceReducer';
import TagReducer from './reducers/TagReducer';
import UserReducer from './reducers/UserReducer';
import NotelinkReducer from './reducers/NotelinkReducer';
import NotelinkAutoReducer from './reducers/NotelinkAutoReducer';
import ColorfilterReducer from './reducers/ColorfilterReducer';

const initialState = {};

const middleware = [thunk];

const store = configureStore(
  {
    reducer: {
      authorization: AuthReducer,
      profile: ProfileReducer,
      user: UserReducer,
      role: RoleReducer,
      company: CompanyReducer,
      space: SpaceReducer,
      tag: TagReducer,
      note: NoteReducer,
      notelink: NotelinkReducer,
      notelinkAuto: NotelinkAutoReducer,
      label: LabelReducer,
      metadataDefinition: MetadataDefinitionReducer,
      metadataValue: MetadataValueReducer,
      colorfilter: ColorfilterReducer
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
