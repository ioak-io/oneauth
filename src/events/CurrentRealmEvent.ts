/* eslint-disable import/prefer-default-export */
import { BehaviorSubject } from 'rxjs';

export const currentRealmEventSubject =
  new BehaviorSubject<CurrentRealmEventType | null>(null);

interface CurrentRealmEventType {
  realm: number;
  name: string;
  description: string;
  site: {
    layout: 'full' | 'split';
    background: string;
  };
}
