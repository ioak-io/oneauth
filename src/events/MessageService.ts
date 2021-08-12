import { Subject, Observable } from 'rxjs';
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

export function httpHandleRequest(
  messageId: any,
  action: string,
  reference: string
) {
  sendMessage('notification', true, {
    id: messageId,
    type: 'running',
    message: `${action} ${reference ? `(${reference})` : ''} - In progress`,
  });
}

export function httpHandleResponse(
  messageId: any,
  response: any,
  action: string,
  reference: string
) {
  if (response.status === 200) {
    sendMessage('notification', true, {
      id: messageId,
      type: 'success',
      message: `${action} ${reference ? `(${reference})` : ''} - Success`,
      duration: 3000,
    });
    return { outcome: true };
  }
  sendMessage('notification', true, {
    id: messageId,
    type: 'failure',
    message: `${action} ${
      reference ? `(${reference})` : ''
    } - Failed with error ${response.status}`,
    duration: 3000,
  });
  return { outcome: false };
}

export function httpHandleResponseSilent(response: any) {
  if (response.status === 200) {
    return { outcome: true, response };
  }
  return { outcome: false, response };
}

export function httpHandleError(
  messageId: any,
  error: any,
  action: string,
  reference: string
) {
  sendMessage('notification', true, {
    id: messageId,
    type: 'failure',
    message: `${action} ${
      reference ? `(${reference})` : ''
    } - Failed with ${error}`,
  });
  return { outcome: false };
}

export function httpHandleErrorSilent(error: any) {
  return { outcome: false, response: error };
}
