import { BehaviorSubject, Subject } from 'rxjs';
import IncomeModel from 'src/model/IncomeModel';

const EditIncomeCommand = new BehaviorSubject<EditIncomeCommandType>({
  open: false,
  record: null,
});

export default EditIncomeCommand;

interface EditIncomeCommandType {
  open: boolean;
  record: IncomeModel | null;
}
