import { BehaviorSubject, Subject } from 'rxjs';
import ExpenseFilterModel from '../model/ExpenseFilterModel';

const AddFilterExpenseCommand =
  new BehaviorSubject<AddFilterExpenseCommandType>({
    open: false,
    payload: {
      from: '',
      to: '',
      description: '',
      moreThan: null,
      lessThan: null,
      days: null,
      months: null,
      monthNumber: null,
      yearNumber: null,
      categoryIdList: [],
      kakeiboList: [],
      tagIdList: [],
    },
  });

interface AddFilterExpenseCommandType {
  payload?: ExpenseFilterModel;
  open: boolean;
}

export default AddFilterExpenseCommand;
