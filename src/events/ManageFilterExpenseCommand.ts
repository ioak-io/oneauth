import { BehaviorSubject, Subject } from 'rxjs';

const ManageFilterExpenseCommand = new BehaviorSubject<boolean>(false);

export default ManageFilterExpenseCommand;
