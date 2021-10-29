import request from '@/utils/request'

const BASE_URL = "/course"

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

export function getCoursePage(current, size, queryVo) {
  return request({
    url: `${BASE_URL}/page/${current}/${size}`,
    method: 'get',
    params: queryVo
  })
}

export function update(course) {
  return request({
    url: `${BASE_URL}/update`,
    method: 'put',
    data: course
  })
}

export function saveOrUpdate(course) {
  return request({
    url: `${BASE_URL}/saveOrUpdate`,
    method: 'post',
    data: course
  })
}

export function getTypeList() {
  return request({
    url: `${BASE_URL}/getTypeList`,
    method: 'get'
  })
}

export function getByTeacherId(id) {
  return request({
    url: `${BASE_URL}/getByTeacherId/${id}`,
    method: 'get'
  })
}


export function back(courseId,studentId) {
  return request({
    url: `${BASE_URL}//backCourse/${courseId}/${studentId}`,
    method: 'delete'
  })
}

