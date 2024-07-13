import { request } from '@umijs/max';

const url: string = API_URL + API_URL_PREFIX + '/admin/ai/tools';

export async function queryRule(params?: any) {
  return request(`${url}`, {
    method: 'GET',
    params,
  });
}
