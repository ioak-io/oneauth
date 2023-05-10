/* eslint-disable import/prefer-default-export */
import {
  COLOR_FILTER_ITEMS_FETCH_AND_SET,
  METADATA_DEFINITION_ITEMS_FETCH_AND_SET
} from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';

export const fetchAndSetColorfilterItems =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`/color-filter/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: COLOR_FILTER_ITEMS_FETCH_AND_SET,
            payload: response.data,
          });
        }
      })
      .catch((error) => { });
  };

export const updateColorfilterItems =
  (colorfilterItems: any[]) => (dispatch: any) => {
    dispatch({
      type: COLOR_FILTER_ITEMS_FETCH_AND_SET,
      payload: colorfilterItems,
    });
  };
