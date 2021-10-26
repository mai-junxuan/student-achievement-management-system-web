import request from '@/utils/request'

const BASE_URL ='/select'


export function selectCourse(studentId, courseId) {
  return request({
    url: `${BASE_URL}/save/${studentId}/${courseId}`,
    method: 'POST'
  })
}

export function back(studentId, courseId) {
  return request({
    url: `${BASE_URL}/back/${studentId}/${courseId}`,
    method: 'delete'
  })
}
