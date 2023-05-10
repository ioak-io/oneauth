import ExpenseFilterModel from '../../model/ExpenseFilterModel';
/* eslint-disable import/prefer-default-export */
import { httpPut } from '../Lib/RestTemplate';

export const saveFilter = (
  space: string,
  payload: ExpenseFilterModel,
  authorization: any
) => {
  httpPut(`/filter/expense/${space}/`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
