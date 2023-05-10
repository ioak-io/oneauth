import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import UserReducer from './UserReducer';
import RoleReducer from './RoleReducer';
import SpaceReducer from './SpaceReducer';
import CategoryReducer from './CategoryReducer';
import ExpenseReducer from './ExpenseReducer';
import CompanyReducer from './CompanyReducer';
import FilterExpenseReducer from './FilterExpenseReducer';
import TagReducer from './TagReducer';
import ReceiptReducer from './ReceiptReducer';
import IncomeCategoryReducer from './IncomeCategoryReducer';
import IncomeReducer from './IncomeReducer';
import NoteReducer from './NoteReducer';
import LabelReducer from './LabelReducer';

export default combineReducers({
  authorization: AuthReducer,
  profile: ProfileReducer,
  user: UserReducer,
  role: RoleReducer,
  company: CompanyReducer,
  space: SpaceReducer,
  category: CategoryReducer,
  tag: TagReducer,
  expense: ExpenseReducer,
  receipt: ReceiptReducer,
  income: IncomeReducer,
  filterExpense: FilterExpenseReducer,
  incomeCategory: IncomeCategoryReducer,
  note: NoteReducer,
  label: LabelReducer
});
