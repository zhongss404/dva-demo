// request 是我们封装的一个网络请求库
import request from '../utils/request';
import qs from 'qs';

export async function query(params) {
  return request(`/api/waybills?${qs.stringify(params)}`);
}

export async function create(params) {
  return request('/api/waybills', {
    method: 'post',
    body: qs.stringify(params),
  });
}

export async function remove(params) {
  return request('/api/waybills', {
    method: 'delete',
    body: qs.stringify(params),
  });
}

export async function update(params) {
  return request('/api/waybills', {
    method: 'put',
    body: qs.stringify(params),
  });
}
