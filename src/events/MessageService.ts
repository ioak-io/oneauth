import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../components/Types/GeneralTypes';

const subject = new Subject<Message>();

export function sendMessage(name: string, signal = true, data?: {}) {
  subject.next({
    name,
    signal,
    data,
  });
}

export function clearMessages() {
  subject.next();
}

export function receiveMessage(): Observable<Message> {
  return subject.asObservable();
}

export function newMessageId() {
  return Math.random();
}

export function newId() {
  return uuidv4();
}
