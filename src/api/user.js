import request from '@/utils/request'

const BASE_URL = '/user'

export function login(data) {
  return request({
    url: `${BASE_URL}/login`,
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: `${BASE_URL}/info`,
    method: 'get',
    params: {token}
  })
}

export function logout() {
  return request({
    url: `${BASE_URL}/logout`,
    method: 'post'
  })
}

