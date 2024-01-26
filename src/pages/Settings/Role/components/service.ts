import { request } from '@umijs/max';

const url: string = API_URL + API_URL_PREFIX + '/auth/permission';

export async function queryTree(params = {}) {
  return request(`${url}/tree-select`, {
    params,
  });
}
