/* eslint-disable import/prefer-default-export */
import { BehaviorSubject } from 'rxjs';

export const OakEditorFocusedEvent = new BehaviorSubject({
  groupId: '',
  id: '',
});
interface OakEditorFocusedEventType {
  groupId: string;
  id: string;
}
