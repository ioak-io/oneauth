/* eslint-disable import/prefer-default-export */
import { BehaviorSubject } from 'rxjs';

export const loginPageSubject = new BehaviorSubject<LoginPageType>({
  state: true,
});

interface LoginPageType {
  state: boolean;
}
