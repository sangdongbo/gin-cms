import { request } from '@umijs/max';

export async function queryRoles(params = {}) {
  return request(API_URL + API_URL_PREFIX + '/auth/role/select', {
    params,
  });
}
