import { BehaviorSubject, Subject } from 'rxjs';

const EditIncomeCategoryCommand =
  new BehaviorSubject<EditIncomeCategoryCommandType>({
    open: false,
  });

interface EditIncomeCategoryCommandType {
  open: boolean;
  record?: any;
}

export default EditIncomeCategoryCommand;
