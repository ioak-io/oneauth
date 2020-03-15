import { httpGet, httpPost, httpPut } from '../Lib/RestTemplate';
import constants from '../Constants';

export function createTenant(data) {
  return httpPost(constants.API_URL_TENANT_CREATE, data, null).then(function(
    response
  ) {
    return Promise.resolve(response);
  });
}

export function sentTenantUrl(data) {
  return httpPost(constants.API_TENANT_URL, data, null).then(function(
    response
  ) {
    return Promise.resolve(response.status);
  });
}

export function getTenant(tenantName, headers) {
  return httpGet(`${constants.API_URL_TENANT}/${tenantName}`, headers).then(
    function(response) {
      return Promise.resolve(response);
    }
  );
}

export function getBanner(tenantName, headers) {
  return httpGet(
    `${constants.API_URL_TENANT_BANNER}/${tenantName}`,
    headers
  ).then(function(response) {
    return Promise.resolve(response);
  });
}
