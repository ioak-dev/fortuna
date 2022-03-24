/* eslint-disable import/prefer-default-export */
import { httpPut } from '../Lib/RestTemplate';

export const saveCategory = (
  space: string,
  payload: any,
  authorization: any
) => {
  httpPut(`/category/${space}/`, payload, {
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
