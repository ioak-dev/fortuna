/* eslint-disable import/prefer-default-export */
import { httpDelete, httpGet, httpPost, httpPut } from '../../Lib/RestTemplate';

export const getUserInvite = (space: string, authorization: any) => {
  return httpGet(`/user/invite/${space}`, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve([]);
    })
    .catch((error) => {
      return Promise.resolve([]);
    });
};

export const sendUserInvite = (
  space: string,
  payload: any,
  authorization: any
) => {
  return httpPost(`/user/invite/${space}/`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      return Promise.resolve({});
    });
};

export const importExpenseFile = (
  space: string,
  payload: any,
  authorization: any
) => {
  const formData = new FormData();
  formData.append('file', payload);
  return httpPost(`/import/${space}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      return Promise.resolve({});
    });
};

export const deleteTransactions = (
  space: string,
  id: string,
  authorization: any
) => {
  return httpDelete(`/import/${space}/transaction/${id}`, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve({});
    })
    .catch((error) => {
      return Promise.resolve({});
    });
};

export const getLog = (space: string, authorization: any) => {
  return httpGet(`/import/log/${space}`, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve([]);
    })
    .catch((error) => {
      return Promise.resolve([]);
    });
};
