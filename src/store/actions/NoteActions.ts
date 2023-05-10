/* eslint-disable import/prefer-default-export */
import {
  NOTE_ITEMS_APPEND,
  NOTE_ITEMS_DELETE,
  NOTE_ITEMS_FETCH_AND_SET,
  NOTE_ITEMS_UPDATE,
} from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';

export const fetchAndSetNoteItems =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`/note/${space}/dictionary`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: NOTE_ITEMS_FETCH_AND_SET,
            payload: response.data,
          });
        }
      })
      .catch((error) => {});
  };

export const updateNoteItem = (payload: any) => (dispatch: any) => {
  dispatch({
    type: NOTE_ITEMS_UPDATE,
    payload,
  });
};

export const appendNoteItem = (payload: any) => (dispatch: any) => {
  dispatch({
    type: NOTE_ITEMS_APPEND,
    payload,
  });
};

export const deleteNoteItems = (payload: any) => (dispatch: any) => {
  dispatch({
    type: NOTE_ITEMS_DELETE,
    payload,
  });
};
