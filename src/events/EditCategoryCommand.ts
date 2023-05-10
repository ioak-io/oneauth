import { BehaviorSubject, Subject } from 'rxjs';

const EditCategoryCommand = new BehaviorSubject<EditCategoryCommandType>({
  open: false,
});

interface EditCategoryCommandType {
  open: boolean;
  record?: any;
}

export default EditCategoryCommand;
