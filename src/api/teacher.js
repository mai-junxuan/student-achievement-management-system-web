import request from '@/utils/request'

const BASE_URL = "/teacher"

export function deleteById(id) {
  return request({
    url: `${BASE_URL}/delete/${id}`,
    method: 'delete'
  })
}

export function getTeacherPage(current, size, queryVo) {
  return request({
    url: `${BASE_URL}/page/${current}/${size}`,
    method: 'get',
    params: queryVo
  })
}

export function saveOrUpdate(student) {
  return request({
    url: `${BASE_URL}/saveOrUpdate`,
    method: 'post',
    data: student
  })
}

export function getById(id) {
  return request({
    url: `${BASE_URL}/getById/${id}`,
    method: 'get'
  })
}
export function group(){
  return request({
    url: `${BASE_URL}/group`,
    method: 'get'
  })
}
