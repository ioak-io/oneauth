import { Subject, Observable, BehaviorSubject } from 'rxjs';
import ExpenseModel from 'src/model/ExpenseModel';

const ExpenseListState = new BehaviorSubject<ExpenseModel[]>([]);

export default ExpenseListState;
