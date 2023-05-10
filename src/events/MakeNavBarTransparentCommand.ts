import { Subject, Observable, BehaviorSubject } from 'rxjs';

const MakeNavBarTransparentCommand = new BehaviorSubject<boolean>(false);

export default MakeNavBarTransparentCommand;
