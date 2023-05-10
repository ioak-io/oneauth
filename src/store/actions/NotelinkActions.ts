/* eslint-disable import/prefer-default-export */
import {
  NOTELINK_ITEMS_APPEND,
  NOTELINK_ITEMS_DELETE,
  NOTELINK_ITEMS_DELETE_BY_NOTEREF,
  NOTELINK_ITEMS_FETCH_AND_SET
} from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';

export const fetchAndSetNotelinkItems =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`/notelink/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: NOTELINK_ITEMS_FETCH_AND_SET,
            payload: response.data,
          });
        }
      })
      .catch((error) => { });
  };


  export const appendNotelinkItem = (payload: any) => (dispatch: any) => {
    dispatch({
      type: NOTELINK_ITEMS_APPEND,
      payload,
    });
  };
  
  export const deleteNotelinkItems = (payload: any) => (dispatch: any) => {
    dispatch({
      type: NOTELINK_ITEMS_DELETE,
      payload,
    });
  };
  
  export const deleteNotelinkItemsByNoteRef = (payload: any) => (dispatch: any) => {
    dispatch({
      type: NOTELINK_ITEMS_DELETE_BY_NOTEREF,
      payload,
    });
  };