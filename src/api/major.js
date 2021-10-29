import request from '@/utils/request'

const BASE_URL = "/major"

export function getById(id) {
  return request({
    url: `${BASE_URL}/getById/${id}`,
    method: 'GET'
  })
}


export function deleteById(id) {
  return request({
    url: `${BASE_URL}/delete/${id}`,
    method: 'delete'
  })
}

export function getMajorPage(current, size, queryVo) {
  return request({
    url: `${BASE_URL}/page/${current}/${size}`,
    method: 'get',
    params: queryVo
  })
}



export function saveOrUpdate(major) {
  return request({
    url: `${BASE_URL}/saveOrUpdate`,
    method: 'post',
    data: major
  })
}

export function getAll() {
  return request({
    url: `${BASE_URL}/getAll`,
    method: 'get'
  })
}
export function getCascade() {
  return request({
    url: `${BASE_URL}/getCascade`,
    method: 'get'
  })
}
