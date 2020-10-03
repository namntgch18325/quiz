import request from '@/utils/request';

export function getResult(query) {
  return request({
    url: '/dashboard/result',
    method: 'get',
    params: query,
  });
}
export function getListUser() {
  return request({
    url: '/dashboard/respondent',
    method: 'get',
  });
}
