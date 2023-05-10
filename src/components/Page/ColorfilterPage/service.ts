import AddSpinnerCommand from '../../../events/AddSpinnerCommand';
import RemoveSpinnerCommand from '../../../events/RemoveSpinnerCommand';
import { newId } from '../../../events/MessageService';
/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from '../../Lib/RestTemplate';

export const getColorfilter = (space: string, authorization: any) => {
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  return httpGet(`/color-filter/${space}`, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      RemoveSpinnerCommand.next(taskId);
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve([]);
    })
    .catch((error) => {
      RemoveSpinnerCommand.next(taskId);
      return Promise.resolve([]);
    });
};

export const saveColorfilter = (
  space: string,
  payload: any,
  authorization: any
) => {
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  return httpPut(`/color-filter/${space}`, payload, {
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

export const moveColorfilter = (
  space: string,
  id: string,
  mode: 'up' | 'down',
  authorization: any
) => {
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  return httpPost(`/color-filter/${space}/${mode}/${id}`, {}, {
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
