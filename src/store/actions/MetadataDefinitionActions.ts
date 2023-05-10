/* eslint-disable import/prefer-default-export */
import {
  METADATA_DEFINITION_ITEMS_FETCH_AND_SET
} from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';

export const fetchAndSetMetadataDefinitionItems =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`/metadata-definition/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: METADATA_DEFINITION_ITEMS_FETCH_AND_SET,
            payload: response.data,
          });
        }
      })
      .catch((error) => { });
  };

export const updateMetadataDefinitionItems =
  (metadataDefinitionItems: any[]) => (dispatch: any) => {
    dispatch({
      type: METADATA_DEFINITION_ITEMS_FETCH_AND_SET,
      payload: metadataDefinitionItems,
    });
  };
