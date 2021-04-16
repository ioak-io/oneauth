/* eslint-disable import/prefer-default-export */
import { BehaviorSubject } from 'rxjs';

export const loginPageSubject = new BehaviorSubject<LoginPageType>({
  state: false,
});

interface LoginPageType {
  state: boolean;
}
