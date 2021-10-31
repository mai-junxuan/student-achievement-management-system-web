import request from '@/utils/request'

const BASE_URL = "/statistic"

export function getStudentInfoExcel(courseId) {
  return request({
    url: `${BASE_URL}/getStudentInfoExcel/${courseId}`,
    method: 'GET'
  })
}
