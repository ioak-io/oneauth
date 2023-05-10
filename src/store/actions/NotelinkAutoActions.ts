/* eslint-disable import/prefer-default-export */
import {
  NOTELINK_AUTO_ITEMS_APPEND,
  NOTELINK_AUTO_ITEMS_DELETE,
  NOTELINK_AUTO_ITEMS_DELETE_BY_NOTEREF,
  NOTELINK_AUTO_ITEMS_FETCH_AND_SET,
  NOTELINK_AUTO_ITEMS_REPLACE
} from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';

export const fetchAndSetNotelinkAutoItems =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`/notelink-auto/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: NOTELINK_AUTO_ITEMS_FETCH_AND_SET,
            payload: response.data,
          });
        }
      })
      .catch((error) => { });
  };


  export const appendNotelinkAutoItem = (payload: any) => (dispatch: any) => {
    dispatch({
      type: NOTELINK_AUTO_ITEMS_APPEND,
      payload,
    });
  };
  
  export const deleteNotelinkAutoItems = (payload: any) => (dispatch: any) => {
    dispatch({
      type: NOTELINK_AUTO_ITEMS_DELETE,
      payload,
    });
  };
  

export const replaceNotelinkAutoItems = (payload: {noteRef: string, newItems: any[]}) => (dispatch: any) => {
  dispatch({
    type: NOTELINK_AUTO_ITEMS_REPLACE,
    payload,
  });
};
  
export const deleteNotelinkAutoItemsByNoteRef = (payload: any) => (dispatch: any) => {
  dispatch({
    type: NOTELINK_AUTO_ITEMS_DELETE_BY_NOTEREF,
    payload,
  });
};