import { Subject, Observable, BehaviorSubject } from 'rxjs';

const HideNavBarCommand = new BehaviorSubject<boolean>(false);

export default HideNavBarCommand;
