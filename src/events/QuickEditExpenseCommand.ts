import { BehaviorSubject, Subject } from 'rxjs';
import ExpenseModel from 'src/model/ExpenseModel';

const QuickEditExpenseCommand =
  new BehaviorSubject<QuickEditExpenseCommandType>({
    open: false,
    record: null,
  });

export default QuickEditExpenseCommand;

interface QuickEditExpenseCommandType {
  open: boolean;
  record: ExpenseModel | null;
}
