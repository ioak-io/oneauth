import { BehaviorSubject, Subject } from 'rxjs';

const EditTagCommand = new BehaviorSubject<EditTagCommandType>({
  open: false,
});

interface EditTagCommandType {
  open: boolean;
  record?: any;
}

export default EditTagCommand;
