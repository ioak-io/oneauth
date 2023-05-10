import { newId } from '../../events/MessageService';
import RemoveSpinnerCommand from '../../events/RemoveSpinnerCommand';
import AddSpinnerCommand from '../../events/AddSpinnerCommand';
import { httpPost } from '../Lib/RestTemplate';

export const DASHBOARD_COLOR_SCHEME: string[] = [
  '#8CA685',
  '#D9BB25',
  '#F2E6CE',
  '#C9B6F2',
  '#6393A6',
  '#6C5B7B',
  '#8C5B49',
  '#BF9A2C',
  '#337AA6',
];

export const DASHBOARD_KAKEIBO_COLOR_SCHEME: string[] = [
  '#4aa98e',
  '#F2C879',
  '#D9763D',
  '#94C6F2',
  '#8C8C8C',
];

export const DASHBOARD_INCOME_EXPENSE_COLOR_SCHEME: string[] = [
  '#92ae56',
  '#92ae56d0',
  '#92ae5640',
  '#b64c49',
  '#b64c49d0',
  '#b64c4950',
];

// export const DASHBOARD_INCOME_EXPENSE_COLOR_SCHEME: string[] = [
//   '#56cbb8',
//   '#56cbb8d0',
//   '#56cbb820',
//   '#1957d2',
//   '#1957d2d0',
//   '#1957d230',
// ];

export const DASHBOARD_BUDGET_ACTUAL_COLOR_SCHEME: string[] = [
  '#8FADBF',
  '#8FADBFd0',
  '#8FADBF40',
  '#0597F2',
  '#0597F2d0',
  '#0597F240',
];
// export const DASHBOARD_BUDGET_ACTUAL_COLOR_SCHEME: string[] = [
//   '#4b7ab3',
//   '#4b7ab3d0',
//   '#4b7ab340',
//   '#b64c49',
//   '#b64c49d0',
//   '#b64c4930',
// ];
export const DASHBOARD_EXPENSE_CHANGE_COLOR_SCHEME: string[] = [
  '#C98667',
  '#4B997F',
];

export const DASHBOARD_WEEKLY_COLOR_SCHEME: string[] = ['#7693A8'];

export const CSSVARIABLES_DARK = {
  SURFACE: '#303031',
  I: '#fcfcfc',
  SURFACE_DARKER: '#49494b',
};

export const CSSVARIABLES_LIGHT = {
  SURFACE: '#fafafa',
  I: '#0f0f0f',
  SURFACE_DARKER: '#e0e0e0',
};

export const getTrend = (space: string, authorization: any, payload: any) => {
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  return httpPost(`/statistics/${space}/trend`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      RemoveSpinnerCommand.next(taskId);
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve({});
    })
    .catch((error) => {
      RemoveSpinnerCommand.next(taskId);
      return Promise.resolve({});
    });
};

export const getMetric = (space: string, authorization: any, payload: any) => {
  return httpPost(`/statistics/${space}/metric`, payload, {
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

export const getWeeklyTrend = (
  space: string,
  authorization: any,
  payload: any
) => {
  return httpPost(`/statistics/${space}/weekly-trend`, payload, {
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

export const getYearlyTrend = (
  space: string,
  authorization: any,
  payload: any
) => {
  return httpPost(`/statistics/${space}/yearly-trend`, payload, {
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

export const getBalanceTrend = (
  space: string,
  authorization: any,
  payload: any
) => {
  return httpPost(`/statistics/${space}/balance`, payload, {
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
