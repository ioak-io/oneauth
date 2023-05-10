import { BehaviorSubject, Subject } from 'rxjs';

const ExpenseListLoadMoreCommand = new BehaviorSubject<boolean>(false);

export default ExpenseListLoadMoreCommand;
