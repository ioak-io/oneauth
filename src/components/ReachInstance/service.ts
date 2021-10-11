import {
  httpGetManual,
  httpPostManual,
  httpPutManual,
} from '../Lib/RestTemplate';

const apiKey = 'ABCD';
const asset = 'reach';

export const searchArticles = (userId: string, criteria: any) => {
  return httpPostManual(
    `/${asset}/article/search`,
    criteria,
    {
      headers: {
        Authorization: getAuth(userId),
      },
    },
    process.env.REACT_APP_REACH_API_URL
  )
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

export const getTags = (userId: string) => {
  return httpGetManual(
    `/${asset}/tag`,
    {
      headers: {
        Authorization: getAuth(userId),
      },
    },
    process.env.REACT_APP_REACH_API_URL
  )
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

export const getCategories = (userId: string) => {
  return httpGetManual(
    `/${asset}/category`,
    {
      headers: {
        Authorization: getAuth(userId),
      },
    },
    process.env.REACT_APP_REACH_API_URL
  )
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

export const getArticle = (userId: string, id: string) => {
  return httpGetManual(
    `/${asset}/article/${id}`,
    {
      headers: {
        Authorization: getAuth(userId),
      },
    },
    process.env.REACT_APP_REACH_API_URL
  )
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve(null);
    })
    .catch((error) => {
      return Promise.resolve(null);
    });
};

export const saveArticle = (userId: string, payload: any) => {
  console.log(payload);
  return httpPutManual(
    `/${asset}/article`,
    payload,
    {
      headers: {
        Authorization: getAuth(userId),
      },
    },
    process.env.REACT_APP_REACH_API_URL
  )
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve(null);
    })
    .catch((error) => {
      return Promise.resolve(null);
    });
};

export const saveCategory = (userId: string, payload: any) => {
  return httpPutManual(
    `/${asset}/category`,
    payload,
    {
      headers: {
        Authorization: getAuth(userId),
      },
    },
    process.env.REACT_APP_REACH_API_URL
  )
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve(null);
    })
    .catch((error) => {
      return Promise.resolve(null);
    });
};

const getAuth = (userId: string) => {
  return `${apiKey} ${userId}`;
};
