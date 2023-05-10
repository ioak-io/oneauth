import { BehaviorSubject, Subject } from 'rxjs';
import ExpenseModel from 'src/model/ExpenseModel';

const AddSpinnerCommand = new BehaviorSubject<string>('');

export default AddSpinnerCommand;
