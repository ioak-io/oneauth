import AddSpinnerCommand from '../../../events/AddSpinnerCommand';
import { newId } from '../../../events/MessageService';
import RemoveSpinnerCommand from '../../../events/RemoveSpinnerCommand';
/* eslint-disable import/prefer-default-export */
import { httpGet, httpPut } from '../../Lib/RestTemplate';

export const getBillById = (space: string, id: string, authorization: any) => {
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  return httpGet(`/bill/${space}/${id}`, {
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

export const saveBill = (space: string, payload: any, authorization: any) => {
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  return httpPut(`/bill/${space}/`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      RemoveSpinnerCommand.next(taskId);
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      RemoveSpinnerCommand.next(taskId);
      return Promise.resolve({});
    });
};
