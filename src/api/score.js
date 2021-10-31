import request from '@/utils/request'

const BASE_URL = '/score'

export function saveOrUpdate(score){
  return request({
    url: `${BASE_URL}/saveOrUpdate`,
    method: 'post',
    data: score
  })
}
export function addStudents(courseId,studentIds){
  return request({
    url: `${BASE_URL}/addStudents/${courseId}`,
    method: 'post',
    data: studentIds
  })
}
