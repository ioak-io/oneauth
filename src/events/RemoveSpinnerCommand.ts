import { BehaviorSubject, Subject } from 'rxjs';

const RemoveSpinnerCommand = new BehaviorSubject<string>('');

export default RemoveSpinnerCommand;
