import { request } from '@umijs/max';

const url: string = API_URL + API_URL_PREFIX + '/auth/role';

export async function queryRule(params?: any) {
  return request(`${url}?include=permissions`, {
    method: 'GET',
    params,
  });
}

export async function updateRule(params?: any) {
  return request(`${url}/${params?.id}`, {
    method: 'PUT',
    data: params || {},
  });
}

export async function addRule(options?: any) {
  return request(`${url}`, {
    method: 'POST',
    data: options || {},
  });
}

export async function removeRule(id: number) {
  return request(`${url}/${id}`, {
    method: 'DELETE',
  });
}

export async function getRule(id: number) {
  return request(`${url}/${id}`);
}
