import request from "@/utils/request";

const BASE_URL = '/college'

export function getCollegeList() {
  return request({
    url: `${BASE_URL}/getCollegeList`,
    method: 'get'
  })
}
