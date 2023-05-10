import AddSpinnerCommand from '../../../events/AddSpinnerCommand';
import RemoveSpinnerCommand from '../../../events/RemoveSpinnerCommand';
import { newId } from '../../../events/MessageService';
/* eslint-disable import/prefer-default-export */
import { httpDelete, httpGet, httpPost, httpPut } from '../../Lib/RestTemplate';

export const getStopwords = (space: string, authorization: any) => {
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  return httpGet(`/stopwords/${space}`, {
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

export const getKeywords = (space: string, authorization: any) => {
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  return httpGet(`/keywords/${space}`, {
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

export const toggleStopword = (
  space: string,
  payload: any,
  authorization: any
) => {
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  return httpPost(`/stopwords/${space}`, payload, {
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
      return Promise.resolve([]);
    });
};

export const deleteStopword = (
  space: string,
  id: string,
  authorization: any
) => {
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  return httpDelete(`/stopwords/${space}/${id}`, {
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

export const resetStopwords = (
  space: string,
  authorization: any
) => {
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  return httpPost(`/stopwords/${space}/reset`, {}, {
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
      return Promise.resolve([]);
    });
};
