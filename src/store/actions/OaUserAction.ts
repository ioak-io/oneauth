import { httpGet } from '../components/Lib/RestTemplate';
import constants from '../components/Constants';
import { FETCH_ALL_USERS } from './types';

const fetchUsers = (authorization) => (dispatch) => {
  httpGet(`${constants.API_URL}`, {
    headers: {
      Authorization: authorization.access_token,
    },
  }).then((response) => {
    dispatch({
      type: FETCH_ALL_USERS,
      payload: { data: response.data.data },
    });
  });
};

export default fetchUsers;
