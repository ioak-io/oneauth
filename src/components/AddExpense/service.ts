import AddSpinnerCommand from '../../events/AddSpinnerCommand';
import { newId } from '../../events/MessageService';
import RemoveSpinnerCommand from '../../events/RemoveSpinnerCommand';
/* eslint-disable import/prefer-default-export */
import { httpPut } from '../Lib/RestTemplate';

export const saveExpense = (
  space: string,
  payload: any,
  authorization: any
) => {
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  return httpPut(`/expense/${space}/`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      RemoveSpinnerCommand.next(taskId);
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve({});
    })
    .catch((error) => {
      RemoveSpinnerCommand.next(taskId);
      return Promise.resolve({});
    });
};
