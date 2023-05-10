import AddSpinnerCommand from '../../../events/AddSpinnerCommand';
import { newId } from '../../../events/MessageService';
import RemoveSpinnerCommand from '../../../events/RemoveSpinnerCommand';
/* eslint-disable import/prefer-default-export */
import { httpDelete, httpGet, httpPost, httpPut } from '../../Lib/RestTemplate';

export const repostTransactions = (
  space: string,
  id: string,
  authorization: any
) => {
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  return httpPost(
    `/schedule/receipt/${space}/${id}/transaction/run`,
    {},
    {
      headers: {
        Authorization: authorization.access_token,
      },
    }
  )
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

export const deleteTransactions = (
  space: string,
  id: string,
  authorization: any
) => {
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  return httpDelete(`/schedule/receipt/${space}/${id}/transaction/delete`, {
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

export const getLog = (space: string, id: string, authorization: any) => {
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  return httpGet(`/schedule/receipt/log/${space}/${id}`, {
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
