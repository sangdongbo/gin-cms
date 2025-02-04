import { request } from '@umijs/max';

const url: string = API_URL + API_URL_PREFIX + '/auth/permission';

export async function queryRule(params?: any) {
  return request(`${url}`, {
    method: 'GET',
    params,
  });
}

export async function updateRule(id: number, options?: any) {
  return request(`${url}/${id}`, {
    method: 'PUT',
    data: options || {},
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

export async function selectPermissionRule(params?: any) {
  return request(`${url}/select`, {
    params,
  });
}
