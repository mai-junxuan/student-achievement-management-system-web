import request from '@/utils/request'

const BASE_URL = "/student"

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

export function getStudentPage(current, size, queryVo) {
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

export function getByCourse(id) {
  return request({
    url: `${BASE_URL}/getByCourse/${id}`,
    method: 'get',
  })
}
export function getCascade(){
  return request({
    url: `${BASE_URL}/getCascade`,
    method: 'get',
  })
}
