import { BehaviorSubject, Subject } from 'rxjs';

export const searchTextChangedEvent$ = new BehaviorSubject<string>('');
export const searchEvent$ = new Subject<string>();
